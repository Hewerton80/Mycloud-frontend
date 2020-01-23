import React from "react"

export const DropDown = props =>{
  const DropDownStyle = {
    display:"block",
    padding:"0px",
    margin:"0px",
    border:"0px",
    position: "absolute",
    background:"transparent",
  }
  return (
    <div style={DropDownStyle}>
      {props.children}
    </div>
  )
}

export const DropDownToogle = props =>{
  

  function handleClick(){
    const nodeElement = document.querySelector(`#${props.id}`)
    if(nodeElement && nodeElement.style.display==="block"){
      nodeElement.style.display="none"
    }else{
      nodeElement.style.display="block"
    }
  }
  document.addEventListener("click",e=>{
    const nodeElement = document.querySelector(`#${props.id}`)
    const dropDown123 = document.querySelector("#dropDown123")
    if(nodeElement && dropDown123 && !dropDown123.contains(e.target) && !nodeElement.contains(e.target)){
      nodeElement.style.display="none"
    }
  })

  const DropDownToogleStyle = {
    padding:"0px",
    margin:"0px",
    border:"0px",
    background:"transparent",
    cursor:"pointer",
  }
  return (
    <div 
      id="dropDown123"
      style={DropDownToogleStyle} 
      onClick={()=>{handleClick()}}
    >
      {props.children}
    </div>
  )
}

export const DropDownContent = props =>{
  const DropDownContentStyle = {
    display:"none",
    padding:"0px",
    margin:"0px",
    border:"0px",
    position: "absolute",
    background:"transparent",
    transform: `translate(${props.translate?props.translate:"0px,0px"})`, 
  }
  return (
    <div 
      style={DropDownContentStyle} 
      id={props.id}
    >
      {props.children}
    </div>
  )
}


