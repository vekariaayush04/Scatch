import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Shop from './Shop'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Header isAdmin={false}/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Home