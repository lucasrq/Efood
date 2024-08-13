import styled from "styled-components";

export const Card = styled.section`
    margin-top:80px;
    position:relative;
    max-width:472px;
    min-height:398px;
    border-left:1px solid #e66767;
    border-right:1px solid #e66767;
    border-bottom:1px solid #e66767;
`
export const CardBorder = styled.section`
   
`
export const Restaurante = styled.img`
    width:100%;
    max-width:600px;
    min-height:350px;
    max-height:350px;
`
export const ContainerTag = styled.div`
    >div{
        position:absolute;
        left:368px;
        top:20px;
    }
    
`

export const ContainerTagDestaque = styled.div`
    >div{
        position:absolute;
        right:28px;
        top:0px;
    }
`
export const Titulo = styled.h3`
    font-size:18px;
    color: #e66767;
    font-weight:700;
    line-height:21px;
    margin:8px;
    font-family:Roboto;
`
export const CardNota = styled.div`
    display:flex;
    justify-content:space-between;
    margin-right: 5px;
`

export const Nota = styled.span`
    font-size:18px;
    color: #e66767;
    font-weight:700;
    margin-right: 7px;
    font-family:Roboto;
`
export const Estrela = styled.img`
    width:21px;
    height:21px;
`

export const Paragraph = styled.p`
    width:452px;
    height:88px;
    font-weight:400;
    font-size:14px;
    line-height:22px;
    color:#e66767;
    margin:6px;
    font-family:Roboto;
`

export const Botao = styled.button`
    color:#fff;
    background-color:#e66767;
    padding:6px;
    margin-left:8px;
    border:none;
    margin-bottom:8px;
    text-decoration:none;
    color:#fff;
    font-family:Roboto;
    a{
        text-decoration:none;
        color:#fff;
    }
`