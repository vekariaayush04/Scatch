import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userData } from '../../atoms/UserAtom'


const Admin = () => {
  const token = localStorage.getItem("token")
  const [user, setUser] = useRecoilState(userData(token));
  const navigate = useNavigate();
  console.log(user);
    
  useEffect(()=>{
    if (!user.isLoggedIn) {
        navigate("/auth");
    }
    if(!user.isAdmin){
      navigate("/")
    }
  },[])
  return (
    <>
        <Header isAdmin={true}/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Admin