import { Container, ModalContainer } from './style';
import Logo from "../../../public/img/Logo.png";
import Cart from '../../Components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../store';
import { open } from '../../store/reducers/cart';

const PerfilHeader = () => {
    const { isOpen } = useSelector((state: RootReducer) => state.cart);
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootReducer) => state.cart);

    const openCart = () => {
        if (items.length <= 0) {
            alert('Não há itens no carrinho');
            return; // Adiciona return aqui para evitar que a ação de abrir o carrinho ocorra
        }
        dispatch(open());
    };

    return (
        <>
            <Container>
                <h1>Restaurantes</h1>
                <img src={Logo} alt="Logo do Restaurante" />
                <h2 onClick={openCart}>
                    {items.length} Produto(s) no carrinho
                </h2>
                <ModalContainer className={isOpen ? 'visivel' : ''}>
                    <Cart />
                </ModalContainer>
            </Container>
        </>
    );
};

export default PerfilHeader;
