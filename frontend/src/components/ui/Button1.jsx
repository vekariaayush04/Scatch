import React from 'react'

const Button1 = ({title , onClick}) => {
  return (
    <button className='flex items-center justify-center bg-blue-600 text-white rounded-3xl px-3 py-1 m-2' onClick={onClick}>{title}</button>
  )
}

export default Button1