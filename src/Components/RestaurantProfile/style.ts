import styled from "styled-components";

export const ContainerList = styled.li`
    background-color: #E66767;
    width:320px;
    height:370px;
    list-style:none;
    margin-bottom:56px;
    
`
export const ContainerGrid = styled.ul`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    column-gap:70px;
`

export const Imagens = styled.img`
    width:320px;
    height:167px;
    padding:8px;
`

export const Title = styled.h2`
    color:#fff;
    padding-left:8px;
    font-family:Roboto;
`

export const Container = styled.div`
    display:flex;
    justify-content:center;
    margin-top:56px;
    
`
export const Paragrafo = styled.p`
    color:#fff;
    padding:8px;
    margin:3px;
    min-height:88px;
    font-size:14px;
    font-family:Roboto;
`

export const Botao = styled.button`
    width:90%;
    border-style:none;
    padding:8px;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    font-family:Roboto;
`
export const ContainerBotao = styled.div`
    display:flex;
    margin:0 auto;
    justify-content:center;
`

export const ContainerPop = styled.div`
    display:flex;
    margin:0 auto;
    justify-content:space-between;
    background-color:#E66767;
    max-width:1100px;
    padding:30px;
    margin-bottom:200px;
    max-height:387px;
    z-index:1;
    .img{
        display:flex;
       > img{
        width:100%;
        max-width:400px;
        padding-right:32px;
    }
    }
`

export const ContentPop = styled.div`
    display:flex;  
    flex-direction:column;
    justify-content:space-between;
    height:279px;
   
    h4{
        font-size:20px;
        color: #fff;
        font-family:Roboto;
    }
    p{
        color:#fff;
        font-family:Roboto;
        
    }
    span{
        color:#fff;
        font-family:Roboto;
    }

    button{
        width:218px;
        color:#E66767;
        border:none;
        padding:3px;
        font-size:14px;
        font-weight:bold;
        cursor: pointer;
        background-color:#ffebd9;
    }
`

export const ClosePop = styled.div`
    > img{
        width:100%;
        max-width:100px;
        cursor: pointer;
    }
    
`

export const Modal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:none;
    align-items:center;
    justify-content:center;

    &.visivel{
        display:flex;
    }
    .overlay{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.73)
    }
`