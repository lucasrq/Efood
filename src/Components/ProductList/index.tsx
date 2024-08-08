import { useEffect, useState } from "react";
import Product from "../Product";
import { Container, List } from "./style";
export type RestaurantersApi = {
    id: number;
    titulo: string;
    destacado?:boolean;
    tipo:string;
    avaliacao: number;
    descricao: string
    capa: string
    cardapio: [
        {
        foto: string,
        preco: number,
        id:number,
        nome:string,
        descricao: string,
        porcao: string
    }
  ]}
const ProcutsList = () => {
const [rest ,setRest] = useState<RestaurantersApi[]>([])
useEffect(()=>{
  fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
  .then(res => res.json())
  .then(res => setRest(res))
},[])

return(
    <Container>
        <List>
            <Product restaurantes={rest} />
        </List>
    </Container>
)
   
};

export default ProcutsList;
