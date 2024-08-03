import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

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