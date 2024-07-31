import styled from "styled-components";

export const Card = styled.section`
    margin-top:80px;
    position:relative;
    max-width:600px;
    min-height:400px;
    border-left:3px solid #e66767;
    border-right:3px solid #e66767;
    border-bottom:3px solid #e66767;
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
    div:nth-child(1) {
        position:absolute;
        left:198px;
        top:20px;
    }
    div:nth-child(2) {
        position:absolute;
        left:370px;
        top:20px;
    }

   
`
export const Titulo = styled.h3`
    font-size:18px;
    color: #e66767;
    font-weight:700;
    line-height:21px;
    margin:8px;
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
`
export const Estrela = styled.img`
    width:21px;
    height:21px;
`

export const Paragraph = styled.p`
    width:456px;
    height:88px;
    font-weight:800;
    font-size:14px;
    line-height:22px;
    color:#e66767;
    margin:5px;
`

export const Botao = styled.button`
    color:#fff;
    background-color:#e66767;
    padding:6px;
    margin-left:8px;
    margin-bottom:8px;
`