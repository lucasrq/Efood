import { useDispatch, useSelector } from 'react-redux';
import lixo from '../../../public/img/excluir.png';
import { Botao, ContainerClose, ContainerPop, ContainerPrato, ContainerSobre, Deli, DisplayNone, IMG, Overlay } from './style';
import { RootReducer } from '../../store';
import { close, remove } from '../../store/reducers/cart';
import { useGetFeatureRestQuery } from '../../Service/api';
import { useParams } from 'react-router-dom';
import { RestaurantersApi } from '../ProductList';

const Cart = () => {
    const { id } = useParams<{ id: string }>();
    const restaurantId = parseInt(id || "0");
    const { isOpen, items } = useSelector((state: RootReducer) => state.cart);
    const dispatch = useDispatch();

    // Obtém os dados dos restaurantes
    const { data: restaurantes } = useGetFeatureRestQuery<RestaurantersApi[]>();
    
    // Cria um mapa de restaurantes
    const restaurantMap = Array.isArray(restaurantes) 
        ? restaurantes.reduce<Record<number, RestaurantersApi>>((map, restaurant) => {
              map[restaurant.id] = restaurant;
              return map;
          }, {}) 
        : {}; // Se não for um array, retorna um objeto vazio

    const restaurant = restaurantMap[restaurantId];

    if (!restaurant) {
        return <h1>Restaurante não encontrado</h1>;
    }

    const cardapio = restaurant.cardapio;

    const getTotalPrice = () => {
        return items.reduce((acumulador, item) => {
            const prato = cardapio.find(c => c.id === item.id); // Usar find aqui
            return prato ? acumulador + prato.preco : acumulador;
        }, 0).toFixed(2);
    };

    const RemoveItem = (id: number) => {
        dispatch(remove(id));
    };

    return (
        <DisplayNone className={isOpen ? 'visivel' : ''}>
            <Overlay onClick={() => dispatch(close())}></Overlay>  
            <ContainerPop>
                <ul>
                    {items.map((item) => {
                        const prato = cardapio.find(c => c.id === item.id); // Usar find aqui
                        return prato ? (
                            <li key={item.id}>
                                <ContainerPrato>
                                    <img src={prato.foto} alt={prato.nome} />
                                </ContainerPrato>
                                <ContainerSobre>
                                    <h3>{prato.nome}</h3>
                                    <span>R$ {prato.preco.toFixed(2)}</span>
                                </ContainerSobre>
                                <ContainerClose onClick={() => RemoveItem(item.id)}>
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
