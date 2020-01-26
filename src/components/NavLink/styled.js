import styled from "styled-components"

export const NavLink = styled.nav`
    padding:0 15px;
    min-height:50px;
    display:flex;
    align-items:center;
    flex:0 0 100%;
    max-width:100%;
    border-bottom:1px solid #ccc;
    margin-bottom:7px;
    span{
        display:flex;
        align-items:center;
        align-items:center;
        border-radius:5px;
        padding:3px 9px;
        &:hover{
            background-color:#f1f3f4;
        }
        svg{
            padding:0 10px;
        }
        a{
            text-decoration:none;
            font-size:22px;
            color:#3c3f46;
            width:100%;
            height:100%;
            &:hover{
                color:#3c3f46;
            }
        }
    }

`