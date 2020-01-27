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
    
    button{
        background-color:transparent;
        display:flex;
        margin-right:35px;
        align-items:center;
        cursor:pointer;
        border:0;
        padding: 8px;
        border-radius: 50%; 
        transform:scale(1.5);
        transition-duration:0.5s;       
        &:active{
            background-color:#8db5ec9e;
        }
        svg{
            transform:scale(1.5);
        }
       
        @media (min-width: 832px) {
            display:none;
        }

    }
    img{
        max-width:38px;
    }
    span{
        font-size:23px;
        margin-left:6px;
    }
`;
export const AppBarSeache = styled.div`
    height:100%;
    display:flex;
    flex-direction:row;
    flex: 0 0 40%;
    max-width:40%;
    align-items:center;
    div{
        @media (min-width: 832px) {
            display:flex;
        }
        display:none;
        flex-direction:row;
        align-items:center;
        border-radius:8px;
        background-color:#f1f3f4;
        padding-left:30px;
        margin-left:15px;
        height:70%;
        width:90%;
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
    }
   
`
export const AppBarProfile = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
    height:100%;
    flex: 0 0 40%;
    max-width:40%;
    div#barProfile{
        padding: 0 20px;
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-end;
        height:100%;
        img{
            height:45px;
            padding:5px 0;
            border-radius:50%;
        }
        div.info-user{
            background-color: #f9f9f9;
            width: 250px;
            transform: translate(100px, 10px);
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            padding:15px;
            border:15px;
            border-radius:10px;
            @media (min-width: 576px) {
                width: 350px;
                transform: translate(0px,0px);
            }
            h6{
                margin:0;
                margin: 0px auto;
                font-size:16px;
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
    }
    

`
