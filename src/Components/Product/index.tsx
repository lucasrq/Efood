import { Link } from "react-router-dom"
import Tag from "../Tag"
import {Restaurante,Botao,ContainerTag, Card, CardBorder, Titulo, Nota, Estrela,CardNota, Paragraph} from './style'


export type Props = {
    id: number 
    image: string;
    infos: string;
    title: string;
    category: string;
    nota: string;
    category2?: string;
    children?: string;
}


const Product = ({category2,children,image, infos,title, category, nota,id}:Props) => (
    <Card>
        <ContainerTag>
            <Tag size="Big">{category2}</Tag>
            <Tag size="Big">{category}</Tag>
        </ContainerTag>
        <Restaurante src={image}/>
        <CardBorder>
            <CardNota>
                <Titulo>{title}</Titulo>
                <div>
                    <Nota>{nota}</Nota>
                    <Estrela src='../../public/img/estrela.png'/>
                </div>
            </CardNota>
        <Paragraph>
            {infos}
        </Paragraph>
        <Botao>
            <Link to={`/Perfil/${id}`}>Saiba Mais</Link>
        </Botao>
        </CardBorder>
    </Card>
)

export default Product