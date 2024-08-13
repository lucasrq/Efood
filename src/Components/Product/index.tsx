import { Link } from "react-router-dom"
import Tag from "../Tag"
import {Restaurante,Botao,ContainerTag, Card, CardBorder, Titulo, Nota, Estrela,CardNota, Paragraph, ContainerTagDestaque} from './style'
import NotaEstrela from '../../../public/img/estrela.png'
import { RestaurantersApi } from "../ProductList"

export type Props = {
    restaurantes: RestaurantersApi[]; 
}
const Product = ({restaurantes}:Props) => {
const getDescript = (descricao: string) => {
        if (descricao.length > 39) {
            return descricao.slice(0, 200) + '...';
        }
        return descricao;
    };

    return (
        <>
        {restaurantes.map((restaurante, index)=>(
            <Card key={index}>
        <ContainerTag>
            <ContainerTagDestaque>
            {restaurante.destacado === true && (
             <Tag size="Big">Destaque</Tag>
            )}
            </ContainerTagDestaque>
        
            <Tag size="Big">{restaurante.tipo}</Tag>
        </ContainerTag>
        <Restaurante src={restaurante.capa}/>
        <CardBorder>
            <CardNota>
                <Titulo>{restaurante.titulo}</Titulo>
                <div>
                    <Nota>{restaurante.avaliacao}</Nota>
                    <Estrela src={NotaEstrela}/>
                </div>
            </CardNota>
        <Paragraph>
            {getDescript(restaurante.descricao)}
        </Paragraph>
        <Botao>
            <Link to={`/Perfil/${restaurante.id}`}>Saiba Mais</Link>
        </Botao>
        </CardBorder>
        </Card>
        ))}
    </>
    )
    
}

export default Product