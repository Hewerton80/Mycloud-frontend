import styled from "styled-components"

export const SideBar = styled.aside`
    /* position:relative; */
    width:250px;
    position:fixed;
    z-index:1;
    height:100%;
    background-color:#fff;
    transform: translateX(${props=>props.show?"0px":"-250px"});
    transition-duration:0.3s;
    @media (min-width: 832px) {
        position:relative;
        flex: 0 0 20%;
        max-width:20%;
        transform: translateX(0px);
    }
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
        display:inline;
        color:${props=>props.active?"#1967d2":"#5f6368"};
    }
`;
