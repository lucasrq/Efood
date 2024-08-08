import { useParams } from "react-router-dom";
import PerfilHeader from '../../Containers/HeaderCompras/Header';
import { Botao, ClosePop, Container, ContainerBotao, ContainerGrid, ContainerList, ContainerPop, ContentPop, Imagens, Modal, Paragrafo, Title } from "./style";
import Footer from "../../Containers/Footer";
import Close from '../../../public/img/close.png';
import { useState } from "react";
import { Props } from "../Product";
import Apresentacao from "../Apresentacao";

const RestaurantProfile = ({ restaurantes }: Props) => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0"); // Garante que `id` seja um número

    // Verifique se id está definido
    if (!id) {
        return <h1>ID não fornecido</h1>;
    }

    // Encontre o restaurante correspondente
    const restaurant = restaurantes.find(r => r.id === restaurantId);

    // Verifique se o restaurante existe
    if (!restaurant) {
        return <h1>Restaurante não encontrado</h1>;
    }

    const getValor = (preco : number) =>{
        return preco.toFixed(2) 
    }
    
    const getDescript = (descricao: string) => {
        if (descricao.length > 39) {
            return descricao.slice(0, 150) +'...';
        }
        return descricao;
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalAberto, setModalAberto] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalUrl, setModalUrl] = useState(0);

    // Encontre o item do cardápio baseado em modalUrl
    const selectedItem = restaurant.cardapio.find(carp => carp.id === modalUrl);

    return (
        <>
            <PerfilHeader />
           
            
                 <Apresentacao titulo={restaurant.tipo} subtitulo={restaurant.titulo} />
            
          
           
            
            <Container>
                <ContainerGrid>
                    {restaurant.cardapio.map((carp) => (
                        <ContainerList key={carp.id}>
                            <Imagens src={carp.foto} />
                            <Title>{carp.nome}</Title>
                            <Paragrafo>{getDescript(carp.descricao)}</Paragrafo>
                            <ContainerBotao>
                                <Botao onClick={() => {
                                    setModalAberto(true);
                                    setModalUrl(carp.id); // Armazena o ID do item
                                }}>Adicionar no carrinho</Botao>
                            </ContainerBotao>
                        </ContainerList>
                    ))}
                </ContainerGrid>
            </Container>
            <Footer />
            {modalAberto && selectedItem && ( // Verifica se selectedItem existe
                <Modal className={modalAberto ? 'visivel' : ''}>
                    <ContainerPop>
                        <div className="img">
                            <img src={selectedItem.foto} alt={selectedItem.nome} />
                            <ContentPop>
                                <h4>{selectedItem.nome}</h4>
                                <p>{selectedItem.descricao}</p>
                                <span>{selectedItem.porcao}</span>
                                <button>Adicionar ao carrinho - R${getValor(selectedItem.preco)}</button>
                            </ContentPop>
                            <ClosePop>
                                <img onClick={() => {
                                    setModalAberto(false);
                                    setModalUrl(0);
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
