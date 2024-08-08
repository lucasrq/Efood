
import { Container, GlobalStyle } from "../../style"
import HomeHeader from "../../Containers/header/Header"
import ProcutsList from "../../Components/ProductList"
import Footer from "../../Containers/Footer"

const Home =  () => {
    return (
        <>
           <GlobalStyle/> 
          <HomeHeader/>
          <Container>
            <ProcutsList/>
          </Container>
          <Footer/>
        </>
      )
}


export default Home