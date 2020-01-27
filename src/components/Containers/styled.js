import styled from "styled-components"

export const Container =  styled.div`
    display:flex;
    flex-direction:row;
`
export const DashBoard = styled.div`
    
    flex: 0 0 100%;
    max-width:100%;
    div#dashboard{
        padding:0 30px 0 15px;
    }
    @media (min-width: 832px) {
        flex: 0 0 80%;
        max-width:80%;
    }
`
export const ContainerAuth = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    form{
        display:flex;
        flex-direction:column;
        padding:48px 40px 36px 40px;
        width:100%;
        max-width:370px;
        /* margin-top:30px; */
        @media (min-width: 576px) {
            border:1px solid #ccc;
            border-radius:5px;
        }
        img{
            width:95px;
            margin:0 auto;
            margin-bottom:10px;
        }
        h2{
            margin-top:10px;
            text-align:center;
        }
        span#erroLogin{
            margin-top:10px;
            text-align:center;
            color:#f00;
        }
        label{
            margin-top:13px;
            color:#1a73e8;
            font-weight:bolder;
        }
        input{
            margin-top:5px;
            padding:13px 15px;
            height:28px;
            font-size:15px;
            display:flex;
            align-items:center;
            border-radius:5px;
            border: 1px solid #ccc;
            &:focus{
                border:2px solid #1a73e8;
                height:26px;
                padding:13px 14px;
            }
        }
        span#footer{
            flex:1;
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-top:17px;
            a{
                color:#1a73e8;
                font-weight:bold;
            }
            button{
                height:36px;
                background-color:#1a73e8;
                font-size: inherit;
                border:0;
                border-radius:3px;
                color:#fff;
                padding:0 16px;
                &[disabled]{
                    cursor:not-allowed;
                    opacity:0.6;
                }
            }
        }
        
    }
`;