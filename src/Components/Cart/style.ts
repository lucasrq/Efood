import styled from "styled-components";

export const ContainerPop = styled.aside`
    width:389px;
    background-color:#E66767;
    height:100vh;
    padding-right:8px;
    z-index:1;
    ul{
        display:flex;
        flex-direction:column;
        li{
            margin-left:8px;
            display:flex;
            min-width:340px;
            background-color:#FFEBD9;
            height:100px;
            margin-top:32px;
        }
    }
   
`

export const ContainerSobre = styled.div`
    min-width:170px;
    color:#E66767;
    font-family:Roboto;
    display:flex;
    flex-direction:column;
    margin:0 auto;
    justify-content:space-between;
    margin-bottom:33px;
    margin-left:10px;
    
    h3{
        font-size:18px;
        margin-top:8px;
    }
    span{
        font-size:14px;
    }
`

export const ContainerClose = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
`

export const IMG = styled.img`
    max-width:16px;
    height:16px;
    margin-bottom:8px;
    margin-right:8px;
    cursor:pointer;
`

export const ContainerPrato = styled.div`
    img{
        width:80px;
        height:80px;
        margin-left:8px;
        margin-top:8px;
    }
`
export const Deli = styled.div`
    display:flex;
    justify-content:space-between;
    margin:40px 20px 0px 8px;
    color:#FFEBD9;
    h3{
        color:#FFEBD9
    }
`

export const Botao = styled.button`
    border:none;
    color:#E66767;
    width:94%;
    margin-left:8px;
    margin-top:16px;
    height:24px;
    background-color:#FFEBD9;
    cursor:pointer;
`
export const DisplayNone = styled.div`
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    display:none;
    justify-content:flex-end;
    z-index:1;
    &.visivel{
        display:flex;
    }
`

export const Overlay = styled.div`
position:absolute;
left:0;
top:0;
width:100%;
height:100%;
background-color:#000;
opacity:0.7;
cursor: pointer;
`