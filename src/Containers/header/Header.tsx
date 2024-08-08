import {Container}  from "./style"
import Logo from "../../../public/img/Logo.png"

const HomeHeader = () =>{
    return(
        <>
         <Container>
            <div>
            <img src={Logo}/>
            </div>
            <h2>Viva experiências gastronômicas no conforto da sua casa</h2>
        </Container>
        </>
    )
}

export default HomeHeader