import { useDispatch, useSelector } from 'react-redux';
import lixo from '../../../public/img/excluir.png';
import { Botao, ContainerClose, ContainerPop, ContainerPrato, ContainerSobre, Deli, DisplayNone, IMG, Overlay } from './style';
import { RootReducer } from '../../store';
import { close, remove } from '../../store/reducers/cart';
import { useGetFeatureRestQuery } from '../../Service/api';
import { useParams } from 'react-router-dom';

const Cart = () => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0");
    const { isOpen, items } = useSelector((state: RootReducer) => state.cart);
    const dispatch = useDispatch();
    const { data: restaurantes } = useGetFeatureRestQuery();
    
    const CloseCart = () => {
        dispatch(close());
    };

    const restaurant = restaurantes?.find(r => r.id === restaurantId);

    if (!restaurant) {
        return <h1>Restaurante não encontrado</h1>;
    }

    const getTotalPrice = () => {
        return items.reduce((acumulador, item) => {
            const prato = restaurant.cardapio.find(c => c.id === item.id);
            return prato ? acumulador + prato.preco : acumulador;
        }, 0).toFixed(2); // Formata o total para duas casas decimais
    };

    const RemoveItem = (id: number) =>{
        dispatch(remove(id))
    }
    return (
        <DisplayNone className={isOpen ? 'visivel' : ''}>
            <Overlay onClick={CloseCart}></Overlay>  
            <ContainerPop>
                <ul>
                    {items.map((item) => {
                        const prato = restaurant.cardapio.find(c => c.id === item.id);
                        return prato ? (
                            <li key={item.id}>
                                <ContainerPrato>
                                    <img src={prato.foto} alt={prato.nome} />
                                </ContainerPrato>
                                <ContainerSobre>
                                    <h3>{prato.nome}</h3>
                                    <span>R$ {prato.preco.toFixed(2)}</span> {/* Verifique se prato.preco é um número */}
                                </ContainerSobre>
                                <ContainerClose onClick={()=> RemoveItem(item.id)}>
                                    <IMG src={lixo} alt="Remover item" />
                                </ContainerClose>
                            </li>
                        ) : null;
                    })}
                </ul>
                <div>
                    <Deli>
                        <h3>Valor total</h3>
                        <span>R$ {getTotalPrice()}</span>
                    </Deli>
                    <Botao>Continuar com a entrega</Botao>
                </div>
            </ContainerPop>
        </DisplayNone>
    );
};

export default Cart;
