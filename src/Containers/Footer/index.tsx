import { Container,ContainerImg,SocialMidia,Logo, ContainerTitle} from "./style"

const Footer = () =>(
     <Container>
        <ContainerImg>
            <Logo src="../../public/img/Logo.png" />
            <div>
                <SocialMidia src="../../public/img/insta.png" />
                <SocialMidia src="../../public/img/fece.png" />
                <SocialMidia src="../../public/img/tt.png" />
            </div>
        </ContainerImg>
        <ContainerTitle>
            <p>A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado. </p>
        </ContainerTitle>
     </Container>
)

export default Footer