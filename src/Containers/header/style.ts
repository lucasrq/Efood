import styled from 'styled-components'
import Fundo from "../../../public/img/fundo.png"


export const Container = styled.header`
    background-image: url(${Fundo});
    height:384px;
    div{
        display:flex;
        justify-content:center;
    }
    img{
        margin-top:64px;
        max-width:100%;
    }
    h2{
        padding-top:138px;
        color:#E66767;
        font-size:36px;
        line-height:42px;
        font-weight:900;
        width:45%;
        text-align:center;
        margin:0 auto;
        font-family:Roboto;
    }
`
