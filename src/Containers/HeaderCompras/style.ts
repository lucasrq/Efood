import styled from 'styled-components'
import Fundo from "../../../public/img/fundo.png"


export const Container = styled.header`
    background-image: url(${Fundo});
    height:184px;
    display:flex;
    justify-content:space-around;
    img{
        margin-top:64px;
        width:125px;
        height:58px;
    }
    h2{
        padding-top:80px;
        color:#E66767;
        font-size:36px;
        line-height:42px;
        font-weight:900;
        width:45%;
        text-align:center;
        margin:0 auto;
    }
`



