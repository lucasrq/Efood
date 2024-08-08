import { styled } from "styled-components"
import ImgFundo from '../../../public/img/a.png'
export const Slid = styled.div`
    width:100%;
    background-image:url(${ImgFundo});
    background-repeat:no-repeat;
    background-size:cover;
    height:370px;
    display:flex;
`
export const Container = styled.div`
    display:flex;
    flex-direction:column;
    margin:0 auto;
    justify-content:space-between;
    width:80%;
    margin-top:30px ;
    margin-bottom:40px;
    color:#fff;
    font-family:Roboto;
    h1{
        font-size:32px;
        font-weight:100;
    }
    h3{
        font-size:32px;
        font-weight:900;
    }
`