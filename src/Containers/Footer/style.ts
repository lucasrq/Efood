import styled from "styled-components";
import Fundo from "../../../public/img/fundo.png"


export const Container = styled.footer`
    background-image: url(${Fundo});
    height:298px;
    margin-top:120px;
    div{
    
        justify-content:center;
    }
    img{

        max-width:100%;
    }
`
export const ContainerImg = styled.div`
    display: flex;
    flex-direction: column; /* Alinha os itens na vertical */
    align-items: center; /* Centraliza horizontalmente */
    justify-content: center; /* Centraliza verticalmente se necessário */
`

export const SocialMidia = styled.img`
    padding-right:12px;
    margin-top:32px;
    margin-bottom:80px;
`

export const Logo = styled.img`
    margin-top:40px;
`

export const ContainerTitle = styled.div`
    display:flex;
    justify-content:center;
    color:#e66767;
    font-family:Roboto;
    margin-bottom:40px;
    width:800px;
    margin:0 auto;
    text-align:center;
`


