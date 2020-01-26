import styled from "styled-components"

export const ButtonPlus = styled.div`
    bottom: 90px;
    position: fixed;
    right: 90px;
    z-index: 3;
    cursor: pointer;
    background-color:rgb(255,255,255,0);

    button{
        border:1px solid #000;
        
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        background-color:#1ea462;
        width:50px;
        height:50px;
        display:flex;
        justify-content:center;
        align-items:center;
        svg{
            transform:scale(1.3);
        }
        cursor:pointer;
        color:#3c4043;
        font-size:17px;
        height:50px;
        border-radius:24px;
        box-shadow:0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149);
        border:1px solid transparent;
        background-color:#fff;
        display:flex;
        flex-direction:row;
        align-items:center;
        transition-duration:0.3s;
        &:hover{
            background-color:#f8f9fa;
            box-shadow:0 1px 3px 0 rgba(60,64,67,0.302), 0 8px 4px 3px rgba(60,64,67,0.149);
            outline:none;

        }
    }
    ul{
        background-color:#fff;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border-radius:10px;
        padding:15px 0;;
        min-width:300px;
        li{
            display:flex;
            flex-direction:row;
            cursor:pointer;
            align-items:center;
            height:30px;
            & + li{
                margin-top:5px;
            }
            &:hover{
                background-color:rgba(0,0,255,.2)
            }
            svg{
                margin:0 10px;
            }
            p{
                margin:0;
                padding:0;
                font-size:15px;
            }

        }
        input{
            display:none;
        }
    }
`