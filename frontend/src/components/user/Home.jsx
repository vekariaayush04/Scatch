import React, { useEffect } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Shop from './Shop'
import { Outlet, useNavigate } from 'react-router-dom'
import { userData } from '../../atoms/UserAtom'
import { useRecoilValue } from 'recoil'

const Home = () => {
  
  return (
    <>
    <div className='h-screen'>
    <Header isAdmin={false}/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default Home