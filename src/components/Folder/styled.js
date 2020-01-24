import styled from "styled-components"

export const Folder = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    height:50px;
    padding:7px 14px;
    margin:7px;
    border-radius:5px;
    border:1px solid #ccc;
    width:100%;
    cursor:pointer;
    &:hover {
        background-color:#e8f0fe;
    }
    &:hover p#foderName{
        color:#1967d2;
    }

`;
export const FolderHead= styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    overflow:hidden;
    height:100%;
    flex:.9;
    svg{
        transform:scale(1.5);
        margin-right:15px;
    }
    p{
        margin:0;
        padding:0;
    }

` 
export const FolderOptions=styled.div`
    display:flex;
    align-items:center;
    flex:.1;
    height:100%;
    span{
        width:100%;
        display:flex;
        height:100%;
        &:hover svg{
            color:#1967d2;
            transform:scale(1.5)
        }
    }
    ul{
        background-color:#fff;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border-radius:10px;
        padding:15px 0;;
        min-width:160px;
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