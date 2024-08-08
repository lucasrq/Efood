import {Container}  from './style'
import Logo from "../../../public/img/Logo.png"

const PerfilHeader = () =>{
    return(
        <>
        <Container>
            <h2>Restaurantes</h2>
            <img src={Logo}/>
            <h2>0 Produto(s) no carrinho</h2>
        </Container>
        </>
    )
}

export default PerfilHeader