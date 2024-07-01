import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <div className='flex top-0 items-center w-screen h-16 border-stone-500 border-b-2'>
            <div className='font-serif text-2xl p-6 '>Shop.</div>
            <div className='flex ml-auto'>
                <Link className='m-2' to={'/user/home'}>Home</Link>
                <Link className='m-2' to={'/user/Products'}>Products</Link>
                <Link className='m-2' to={'/user/cart'}>Cart</Link>
                <Link className='my-2 ml-2 mr-6'>My Account</Link>
            </div>
        </div>
    </>
  )
}

export default Header