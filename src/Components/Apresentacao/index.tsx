
import { Slid, Container } from "./style"
type Props = {
    titulo: string
    subtitulo: string
}
const Apresentacao =({titulo, subtitulo} : Props) =>{
   
    return(
        <Slid>
            <Container>

           
                <h1>
                    {titulo}
                </h1>

                <h3>
                    {subtitulo}
                </h3>
            </Container>

        </Slid>
    )
}
export default Apresentacao