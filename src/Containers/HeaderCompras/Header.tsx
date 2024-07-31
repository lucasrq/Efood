import {Apresentacao, Container, ContainerRestaurantes}  from './style'
import Logo from "../../../public/img/Logo.png"
import { useState } from 'react'

const PerfilHeader = () =>{

    const [contador, setContador] = useState(0)

    function Comprar(){
        setContador (contador + 1) 
        return
    }

    function LiparCompra(){
        setContador (0)
        return
    }
    return(
        <>
         <Container>
            <h2>Restaurantes</h2>
            <img src={Logo}/>
            <h2>{contador} Produto(s) no carrinho</h2>
        </Container>
        <Apresentacao>
            
        </Apresentacao>
        {/* <ContainerRestaurantes>
            <button onClick={Comprar}> Comprar</button>
            <button onClick={LiparCompra}> reseta</button>
        </ContainerRestaurantes> */}

        {/* <button onClick={Comprar}> Comprar</button>
        <button onClick={LiparCompra}> reseta</button> */}
        </>
    )
}

export default PerfilHeader