import styled from "styled-components"

export const SideBar = styled.aside`
    /* position:relative; */
    width:250px;
    flex: 0 0 20%;
    max-width:20%;
    height:100%;
    background-color:#fff;
`

export const SideBarBrand = styled.div`
    min-height:50px;
    display:flex;
    align-items:center;
    padding-left:30px;
    padding-top:10px;
    
    button#button-new{
        svg{
            transform:scale(1.3);
            margin-right:10px;
        }
        cursor:pointer;
        color:#3c4043;
        font-size:17px;
        padding:0px 25px;
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
        color:${props=>props.active?"#1967d2":"#5f6368"};
    }
`;
