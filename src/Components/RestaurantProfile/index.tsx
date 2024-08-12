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
import { useDispatch } from "react-redux";
import { add, open } from "../../store/reducers/cart";
import Apresentacao from "../Apresentacao";


interface CardapioItem {
    id: number;
    foto: string;
    nome: string;
    descricao: string;
    porcao: string;
    preco: number;
}

interface Restaurante {
    id: number;
    tipo: string;
    titulo: string;
    descricao:string;
    cardapio: CardapioItem[];
}

interface RestaurantersApi {
    id: number;
    tipo: string;
    titulo: string;
    descricao: string;
    avaliacao?: number;
    destacado?:boolean;
    capa?: string;
    cardapio: CardapioItem[];
}

interface RestaurantProfileProps {
    restaurantes: RestaurantersApi[]; 
}

const RestaurantProfile: React.FC<RestaurantProfileProps> = ({ restaurantes }) => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0");
    
    const dispatch = useDispatch();
    const [modalAberto, setModalAberto] = useState(false);
    const [modalUrl, setModalUrl] = useState<number | null>(null);
    
    
    if (!Array.isArray(restaurantes)) {
        return <h1>Dados de restaurantes não estão disponíveis</h1>;
    }

    const filteredRestaurants = restaurantes.filter((r): r is Restaurante => r.id === restaurantId);
    
    const restaurant = filteredRestaurants[0];
   
    if (!restaurant) {
        return <h1>Restaurante não encontrado</h1>;
    }

    const formatarPreco = (preco: number) => preco.toFixed(2);
    const getDescript = (descricao: string) => descricao.length > 39 ? `${descricao.slice(0, 150)}...` : descricao;
    const selectedItem = restaurant.cardapio.find((carp: CardapioItem) => carp.id === modalUrl);

    const addToCard = () => {
        if (selectedItem) {
            const itemToAdd: RestaurantersApi = {
                id: selectedItem.id,
                tipo: restaurant.tipo,
                titulo: restaurant.titulo,
                descricao: selectedItem.descricao,
                cardapio: [selectedItem],
            };
    
            dispatch(add(itemToAdd));
            dispatch(open());
        }
    };

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
