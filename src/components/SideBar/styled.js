import styled from "styled-components"

export const SideBar = styled.aside`
    /* position:relative; */
    width:250px;
    flex: 0 0 20%;
    max-width:20%;
    height:100%;
    background-color:#fff;
`

export const SideBarNav = styled.ul`
    list-style:none;
    padding:15px 0px;
    button{
        background:transparent;
        border:0;
    }
`;
export const SideBarItem = styled.li`

    list-style:none;
    font-size:18px;
    display:flex;
    flex-direction:row;
    align-items:center;
    a{
        background-color:${props=>props.active?"#e8f0fe":"#fff"};
        border-radius:0px 15px 15px 0px;
        padding-left:30px;
        padding:10px 30px;
        width:100%;
        height:100;
    }
    &:hover a{
        background-color:${props=>props.active?"#e8f0fe":"#cec4c430"};
    }
    svg{
        
        transform: scale(1.2);
        margin-right:35px;
        color:${props=>props.active?"#1967d2":"#5f6368"};
    }
    span{
        @media (min-width: 576px) {
            display:inline;
        }
        display:none;
        color:${props=>props.active?"#1967d2":"#5f6368"};
    }
`;
