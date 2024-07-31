import styled from "styled-components";
import {Props} from '.'

export const TagContainer = styled.div<Props>`
    background-color:#E66767;
    color:#fff;
    font-size:${props => props.size === 'Big' ? '16px' : '10px'};
    font-weight:bold;
    line-height:14px;
    align-items:center;
    padding:6px 4px;
    display:flex;
    max-width:150px;
`

