import styled from "styled-components"

export const AppBar = styled.header`
    display:flex;
    flex-direction:row;
    height:65px;
    
    align-items:center;
    border-bottom:1px solid #ccc;
    background-color:rgb(250,250,250,0);
`;
export const AppBarBrand = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    max-width:250px;
    padding-left:30px;
    width:100%;
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
    flex:.5;
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
    flex:.5;
    img{
        height:70%;
        border-radius:50%;
        cursor:pointer;
    }
`