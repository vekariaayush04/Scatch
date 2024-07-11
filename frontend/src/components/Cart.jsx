import React from 'react'
import CartItem from './ui/CartItem'

const Cart = () => {

    
  return (
    <>
       <div className='flex'>
       <div className='h-[34rem] w-3/5'>
        <CartItem bgcolor={"#00FF00"} productname={"Ayush Vekariya"} price={"500"} quantity={"4"}/>
        <CartItem bgcolor={"#0000FF"}/>
        <CartItem bgcolor={"#0000FF"}/>
        <CartItem bgcolor={"#0000FF"}/>
       </div>
       <div className='w-2/5'>
        <div className='h-[17rem] bg-slate-400 m-6 rounded-xl'>
            <div className='pt-3 pl-4 m-2 text-xl font-semibold'>Price Breakdown</div>

            <div className='m-2 pl-7'>
                <div className='m-1 font-semibold'>Total MRP</div>
                <div className='m-1 font-semibold'>Discount on MRP</div>
                <div className='m-1 font-semibold'>Platform Fee</div>
                <div className='m-1 font-semibold'>Shipping Fee</div>
            </div>

            <div className='m-2 pl-7 pt-7 font-semibold text-lg'>Total Amount </div>
            <button className='ml-7 mt-1 h-8 px-3 rounded-xl bg-black text-white'>Place Order</button>
        </div>
       </div>
       </div>
    </>
  )
}

export default Cart