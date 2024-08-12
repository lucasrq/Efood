import { useParams } from "react-router-dom";
import PerfilHeader from '../../Containers/HeaderCompras/Header';
import { 
    Botao, 
    ClosePop, 
    Container, 
    ContainerBotao, 
    ContainerGrid, 
    ContainerList, 
    ContainerPop, 
    ContentPop, 
    Imagens, 
    Modal, 
    Paragrafo, 
    Title 
} from "./style";
import Footer from "../../Containers/Footer";
import Close from '../../../public/img/close.png';
import { useState } from "react";
import { useGetFeatureRestQuery } from "../../Service/api";
import Apresentacao from "../Apresentacao";
import { useDispatch } from "react-redux";
import { add, open } from "../../store/reducers/cart";

// Defina o tipo para o item do cardápio
interface CardapioItem {
    id: number;
    foto: string;
    nome: string;
    descricao: string;
    porcao: string;
    preco: number;
}

// Defina o tipo para Restaurantes
interface Restaurante {
    id: number;
    tipo: string;
    titulo: string;
    cardapio: CardapioItem[];
}

const RestaurantProfile = () => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0");
    
    const { data: restaurantes = [], isLoading, error } = useGetFeatureRestQuery();
    const dispatch = useDispatch();

    // Estado para controle do modal
    const [modalAberto, setModalAberto] = useState(false);
    const [modalUrl, setModalUrl] = useState<number | null>(null);
    
    // Verifique se está carregando ou houve erro
    if (isLoading) {
        return <h1>Carregando...</h1>;
    }

    if (error) {
        return <h1>Erro ao carregar os dados</h1>;
    }

    // Verifique se restaurantes é um array
    if (!Array.isArray(restaurantes)) {
        return <h1>Dados de restaurantes não estão disponíveis</h1>;
    }

    // Encontre o restaurante correspondente
    const restaurant = restaurantes.find((r: Restaurante) => r.id === restaurantId);

    // Verifique se o restaurante existe
    if (!restaurant) {
        return <h1>Restaurante não encontrado</h1>;
    }

    const formatarPreco = (preco: number) => {
        return preco.toFixed(2);
    }

    const getDescript = (descricao: string) => {
        return descricao.length > 39 ? descricao.slice(0, 150) + '...' : descricao;
    };

    // Use o tipo do item do cardápio aqui
    const selectedItem = restaurant.cardapio.find((carp: CardapioItem) => carp.id === modalUrl);

    const addToCard = () => {
        if (selectedItem) {
            dispatch(add(selectedItem));
            dispatch(open());
        }
    }

    return (
        <>
            <PerfilHeader />
            <Apresentacao titulo={restaurant.tipo} subtitulo={restaurant.titulo} />
            <Container>
                <ContainerGrid>
                    {restaurant.cardapio.map((carp: CardapioItem) => (
                        <ContainerList key={carp.id}>
                            <Imagens src={carp.foto} alt={carp.nome} />
                            <Title>{carp.nome}</Title>
                            <Paragrafo>{getDescript(carp.descricao)}</Paragrafo>
                            <ContainerBotao>
                                <Botao onClick={() => {
                                    setModalAberto(true);
                                    setModalUrl(carp.id);
                                }}>
                                    Adicionar no carrinho
                                </Botao>
                            </ContainerBotao>
                        </ContainerList>
                    ))}
                </ContainerGrid>
            </Container>
            <Footer />
            {modalAberto && selectedItem && (
                <Modal className={modalAberto ? 'visivel' : ''}>
                    <ContainerPop>
                        <div className="img">
                            <img src={selectedItem.foto} alt={selectedItem.nome} />
                            <ContentPop>
                                <h4>{selectedItem.nome}</h4>
                                <p>{selectedItem.descricao}</p>
                                <span>{selectedItem.porcao}</span>
                                <button onClick={() => {
                                    addToCard();
                                    setModalAberto(false);
                                }}>
                                    Adicionar ao carrinho - R${formatarPreco(selectedItem.preco)}
                                </button>
                            </ContentPop>
                            <ClosePop>
                                <img onClick={() => {
                                    setModalAberto(false);
                                    setModalUrl(null); // Mudei de 0 para null
                                }} src={Close} alt="Fechar" />
                            </ClosePop>
                        </div>
                    </ContainerPop>
                    <div className="overlay"></div>
                </Modal>
            )}
        </>
    );
}

export default RestaurantProfile;
