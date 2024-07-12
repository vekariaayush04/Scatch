import React from 'react'
import img from '../../assets/bag.png'
const CartItem = ({bgcolor , productname ,quantity, price}) => {
  return (
    <div className={`h-[17rem] flex m-6 rounded-2xl border-2`} style={{ backgroundColor: bgcolor }}>
          <div className='rounded-l-2xl' style={{ backgroundColor: "blue" }}>
            <img src={img} alt="img" className='h-[13rem] my-8 mx-6' />
          </div>
          <div className=' m-4'>
            <div className='m-3 font-bold text-2xl mb-2'>{productname}</div>
            <div className='m-3 text-lg text-gray-500 mb-2'>Item Price : {price}</div>
            <div className='m-3 mt-16 text-lg text-gray-500'>Qty: {quantity}</div>
            <div className='m-3 text-lg text-gray-500 mb-2'>Net Total  : {price * quantity}</div>
          </div>
    </div>
    
  )
}

export default CartItem