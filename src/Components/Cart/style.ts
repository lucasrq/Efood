import styled from "styled-components";

export const ContainerPop = styled.aside`
    width:389px;
    background-color:#E66767;
    height:100vh;
    padding-right:8px;
    z-index:1;
    ul{
        &.visivel{
            display:none;
        }
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
    &.visivel{
        display:none;
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
    &.visivel{
        display:none;
    }
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

export const Checkout  = styled.div`
    color:#FFEBD9;
    font-weight:bold;
    margin:9px 0 0 20px;
    font-size:14px;
    font-family:Roboto;
    text-align:left;
    &.visivel{
        display:none;
    }
    h3{
        font-size:16px;
        font-family:Roboto;
        
    }
    form{
        display:flex;
        flex-direction:column;
        
        input{
            border:none;
            background-color:#FFEBD9;
            height:32px;
            max-width:344px;
            width:100%;
        }
        label{
            margin:10px 0;
            
        }
     div{
        display:flex;
        margin:4px 0;

        >div{
            display:block;
            margin-right:34px;

            input{
                width:155px;
            }
        }
     }
    }
`

export const ContanerBotao = styled.div`
    display:flex;
    flex-direction:column;
    max-width:344px;
    margin-top:24px;
    button{
        height:24px;
        border:none;
        text-decoration:none;
        margin-bottom:8px;
        background-color:#FFEBD9;
        color:#E66767;
        font-family:Roboto;
        font-size:14px;
        font-weight:bold;
    }
   
`
export const CheckoutCard  = styled.div`
    color:#FFEBD9;
    font-weight:bold;
    margin:9px 0 0 20px;
    font-size:14px;
    font-family:Roboto;
    text-align:left;
    &.visivel{
        display:none;
    }
    h3{
        font-size:16px;
        font-family:Roboto;
        
    }
    form{
        display:flex;
        flex-direction:column;
        
        input{
            border:none;
            background-color:#FFEBD9;
            height:32px;
            max-width:344px;
            width:100%;
        }
        label{
            margin:10px 0;
            
        }
     div{
        display:flex;
        margin:4px 0;

        >div{
            display:block;
            margin-right:34px;

            input{
                width:155px;
            }
        }
     }
    }
`

export const Finalidy  = styled.div`
    color:#FFEBD9;
    font-weight:bold;
    margin:9px 0 0 20px;
    font-size:14px;
    font-family:Roboto;
    text-align:left;
    &.visivel{
        display:none;
    }
    h3{
        font-size:16px;
        font-family:Roboto;
    }
    
    p{
        font-size:14px;
        line-height:22px;
        margin-top:20px;
    }


    &.visivel{
        display:none;
    }
`