import React, { useEffect } from 'react'
import SideBar from '../ui/SideBar'
import NewProduct from './NewProduct'
import { Outlet, useNavigate } from 'react-router-dom'


const AdminHome = () => {
  return (
    <>
        <div className='w-screen flex'>
            <SideBar isAdmin={true}/>
            <Outlet/>
        </div>
    </>
  )
}

export default AdminHome