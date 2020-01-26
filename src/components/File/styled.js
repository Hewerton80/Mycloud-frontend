import styled from "styled-components"

export const File = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    width:100%;
    margin:7px;
    border: 1px solid #ccc;
    &:hover {
        background-color:#e8f0fe;
    }
    &:hover p#foderName{
        color:#1967d2;
    }
    overflow:hidden;
`
export const FileHeader = styled.div`
    justify-content:center;
    display:flex;
    align-items:center;
    height: 150px;
    width:100%;
    overflow:hidden;
    cursor: pointer;
    img{
        height:100%;
        width:100%;
        transition-duration:0.5s;
    }
    svg{
        transform:scale(3.5);
        transition-duration:0.5s;
    }
    
    &:hover img{
        transform:scale(1.3);
    }
    &:hover svg{
        transform:scale(4.5);
    }
`
export const FileFooter = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    border-top: 1px solid #ccc;
    max-height:30px;
    width: calc(100% - 14px);
    padding:7px 14px;
    overflow:hidden;
 
`
export const FileName = styled.div`
    flex: .9;
    display:flex;
    align-items:center;
    overflow:hidden;
`
export const FileOptions = styled.div`
display:flex;
    align-items:center;
    flex:.1;
    height:100%;
    span{
        cursor:pointer;
        width:100%;
        display:flex;
        height:100%;
        svg{
            transition-duration:0.2s;
        }
        &:hover svg{
            color:#1967d2;
            transform:scale(1.5);
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
    }
`