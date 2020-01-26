import {createGlobalStyle } from "styled-components"

const GlobalStyle =  createGlobalStyle `
    *{
        padding:0px;
        margin:0px;
        list-style:none;
        text-decoration:none;
        
    }
    body,input,button{
        color:#3e5569;
        font-size:14px;
        font-family:Arial, Helvetica, sans-serif;
        outline: none;
    }
    button{
        cursor:pointer;
    }
`;
export default GlobalStyle