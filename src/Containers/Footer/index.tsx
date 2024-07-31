import { Container,ContainerImg,SocialMidia,Logo, ContainerTitle} from "./style"
import SocialInst from '../../../public/img/insta.png'
import SocialFece from '../../../public/img/fece.png'
import SocialTT from '../../../public/img/tt.png'
import Efood from '../../../public/img/Logo.png'
const Footer = () =>(
     <Container>
        <ContainerImg>
            <Logo src={Efood} />
            <div>
                <SocialMidia src={SocialInst} />
                <SocialMidia src={SocialFece} />
                <SocialMidia src={SocialTT} />
            </div>
        </ContainerImg>
        <ContainerTitle>
            <p>A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado. </p>
        </ContainerTitle>
     </Container>
)

export default Footer