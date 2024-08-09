import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-removebg-preview.png'

const Header = ({ isAdmin}) => {
  return (
    <>
        <div className='flex top-0 items-center w-screen h-16 border-stone-500 border-b-2'>
            <div className='font-serif text-2xl p-6 '>
              Scatch
            </div>
            <div className='flex ml-auto'>
              {isAdmin ? (
                  <>
                  <Link className='m-2' to={''}>Home</Link>
                  <Link className='m-2' to={'/admin/products'}>Products</Link>
                  <Link className='my-2 ml-2 mr-6' to={"/admin/MyAccount"}>My Account</Link>
                </>
                ) : (
                  <>
                  <Link className='m-2' to={''}>Home</Link>
                  <Link className='m-2' to={''}>Products</Link>
                  <Link className='m-2' to={'cart'}>Cart</Link>
                  <Link className='my-2 ml-2 mr-6' to={"/MyAccount"}>My Account</Link>
                </>
                )}
            </div>
        </div>
    </>
  )
}

export default Header