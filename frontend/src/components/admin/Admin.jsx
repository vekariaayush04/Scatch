import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userData } from '../../atoms/UserAtom'
import { countData } from '../../atoms/countAtom'

const Admin = () => {
  
  return (
    
    <>
        <Header isAdmin={true}/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Admin