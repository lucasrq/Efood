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

// Defina o tipo esperado pela ação add
interface RestaurantersApi {
    id: number;
    tipo: string;
    titulo: string;
    descricao: string; // Adicionando a descrição como obrigatória
    avaliacao?: number; // Propriedade opcional
    capa?: string; // Propriedade opcional
    cardapio: CardapioItem[];
}

// Defina o tipo de retorno do hook
interface GetFeatureRestResponse {
    data: Restaurante[];
    isLoading: boolean;
    error: unknown;
}

const RestaurantProfile = () => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0");
    
    const { data: restaurantes = [], isLoading, error } = useGetFeatureRestQuery() as unknown as GetFeatureRestResponse; // Definindo o tipo esperado
    const dispatch = useDispatch();

    // Estado para controle do modal
    const [modalAberto, setModalAberto] = useState(false);
    const [modalUrl, setModalUrl] = useState<number | null>(null);
    
    // Verifique se está carregando ou houve erro
    if (isLoading) {
        return <h1>Carregando...</h1>;
    }

    if (error) {
        return (
            <div>
                <h1>Erro ao carregar os dados</h1>
                <button onClick={() => window.location.reload()}>Tentar Novamente</button>
            </div>
        );
    }

    // Verifique se restaurantes é um array
    if (!Array.isArray(restaurantes)) {
        return <h1>Dados de restaurantes não estão disponíveis</h1>;
    }

    // Encontre o restaurante correspondente usando filter
    const filteredRestaurants = restaurantes.filter((r): r is Restaurante => {
        return typeof r.id === "number" && r.id === restaurantId;
    });
    
    const restaurant = filteredRestaurants[0]; // Acesse o primeiro restaurante encontrado

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

    const selectedItem = restaurant.cardapio.find((carp: CardapioItem) => carp.id === modalUrl) as CardapioItem | undefined;

    const addToCard = () => {
        if (selectedItem) {
            // Crie um novo objeto que inclua as propriedades necessárias
            const itemToAdd: RestaurantersApi = {
                id: selectedItem.id,
                tipo: restaurant.tipo, // Obtém o tipo do restaurante
                titulo: restaurant.titulo, // Obtém o título do restaurante
                descricao: selectedItem.descricao, // Inclui a descrição do item selecionado
                cardapio: [selectedItem], // Adiciona o item selecionado ao cardápio
            };

            dispatch(add(itemToAdd));
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
                                <img 
                                    onClick={() => {
                                        setModalAberto(false);
                                        setModalUrl(null);
                                    }} 
                                    src={Close} 
                                    alt="Fechar" 
                                    aria-label="Fechar modal" 
                                />
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
