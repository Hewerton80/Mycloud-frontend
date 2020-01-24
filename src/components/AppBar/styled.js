import styled from "styled-components"

export const AppBar = styled.header`
    display:flex;
    flex-direction:row;
    height:65px;
    padding:0 30px;
    align-items:center;
    border-bottom:1px solid #ccc;
    background-color:rgb(250,250,250,0);
`;
export const AppBarBrand = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    flex: 0 0 20%;
    max-width:20%;    
    height:100%;
    img{
        max-width:38px;
    }
    span{
        font-size:23px;
        margin-left:6px;
    }
`;
export const AppBarSeache = styled.div`
    height:70%;
    display:flex;
    flex-direction:row;
    flex: 0 0 40%;
    max-width:40%;
    padding-left:30px;
    align-items:center;
    margin-left:15px;
    border-radius:8px;
    background-color:#f1f3f4;
    svg{
        transform:scale(1.2)
    }
    input{
        width:100%;
        height:100%;
        border:0;
        background:transparent;
        padding:0 20px;
        font-size:15px;
        box-shadow:0;
    }
`
export const AppBarProfile = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
    height:100%;
    padding: 0 20px;
    flex: 0 0 40%;
    max-width:40%;
    img{
        height:55px;
        padding:5px 0;
        border-radius:50%;
        &:hover div{

        }
    }
    div.info-user{
        background-color: #f9f9f9;
        min-width: 350px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding:15px;
        border:15px;
        border-radius:10px;
        h6{
            margin:0;
            margin: 0px auto;
        }
        p#email{
            
            margin:0;
            color:#767a7e;
            margin-bottom:7px;
            padding-bottom:7px;
            border-bottom:1px solid #ccc;
        }
        p#logout{
            display:flex;
            flex-direction:row;
            align-items:center;
            margin:0;
            cursor:pointer;
            svg{
                transform:scale(1.4);
                padding-right:5px;
            }
            &:hover{
                background-color:rgba(0,0,255,.2)
            }
        }
    }
    

`
