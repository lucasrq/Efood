import styled from "styled-components";

export const ContainerList = styled.li`
    background-color: #E66767;
    width:304px;
    height:370px;
    list-style:none;
    margin-bottom:56px;
`
export const ContainerGrid = styled.ul`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    column-gap:40px;
    
`

export const Imagens = styled.img`
    width:304px;
    height:167px;
    padding:8px;
`

export const Title = styled.h2`
    color:#fff;
    padding-left:8px;
`

export const Container = styled.div`
    display:flex;
    justify-content:center;
    margin-top:56px;
`
export const Paragrafo = styled.p`
    color:#fff;
    padding:8px;
    min-height:88px;
    font-size:14px;
`

export const Botao = styled.button`
    width:90%;
    border-style:none;
    padding:8px;
    justify-content:center;
    align-items:center;
    cursor: pointer;
`
export const ContainerBotao = styled.div`
    display:flex;
    margin:0 auto;
    justify-content:center;
`