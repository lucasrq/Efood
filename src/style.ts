// style.js (ou qualquer nome adequado)
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        padding:0;
        margin:0;
        box-sizing:border-box;
    }
    body{
        background-color:#fff8f2;
    }
`;

export const Container = styled.div`
    margin:0 auto;
    display:flex;
`
