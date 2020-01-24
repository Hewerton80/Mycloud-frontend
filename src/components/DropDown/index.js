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
    const dropDownContentElement = document.querySelector(`#${props.htmlFor}`)
    if(dropDownContentElement && dropDownContentElement.style.display==="block"){
      dropDownContentElement.style.display="none"
    }else if(dropDownContentElement && dropDownContentElement.style.display==="none"){
      dropDownContentElement.style.display="block"
    }
  }
  document.addEventListener("click",e=>{
    const dropDownToogleElement = document.querySelector(`#${props.id}`)
    const dropDownContentElement = document.querySelector(`#${props.htmlFor}`)
    if(dropDownContentElement && dropDownToogleElement && !dropDownToogleElement.contains(e.target) && !dropDownContentElement.contains(e.target)){
      dropDownContentElement.style.display="none"
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
      id={props.id}
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
    zIndex:1000
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


