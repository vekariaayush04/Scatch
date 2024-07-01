import React from 'react'

const InputBox = ({type , placeholder , onchange , color}) => {
  return (
    <input className={`m-2 w-80 p-1.5 bg-${color}-300`} type={type} placeholder={placeholder} onChange={onchange}/>
  )
}

export default InputBox