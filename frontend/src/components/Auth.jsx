import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo-removebg-preview.png'
import Button1 from "./ui/Button1";
import InputBox from "./ui/InputBox";
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { userData } from "../atoms/UserAtom";


const Auth = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [isAdmin , setIsAdmin] = useState(null)
  const user = useRecoilValue(userData(token))

  const [ signupData , setSignupData] = useState({
    username:"",
    email:"",
    password:""

  })

  const [ loginData , setLoginData] = useState({
    email:"",
    password:""
  }) 

  useEffect(()=>{
    if(localStorage.getItem('token')){
      user.isAdmin ? navigate("/admin") : navigate('/');
    }
  },[])

  useEffect(() => {
    console.log("Is Authenticated:", isAuthenticated);
    console.log("Is Admin:", isAdmin);
    console.log(localStorage.getItem('token'));
    if (isAuthenticated) {
      isAdmin ? navigate("/admin") : navigate('/');
    }
  }, [isAdmin]);
  

  const handleSignin = async ()=>{
    try {
      const data = await axios.post("http://localhost:3000/v1/user/auth/login",loginData)
      const userData = await data.data
      localStorage.setItem("token",userData.token)
      setIsAuthenticated(true)
      setIsAdmin(userData.isAdmin)      
    } catch (error) {
      toast.error("Login failed",{  
      });
    }           
  }

  const handleSignup = async ()=>{
    try {
      const response = await axios.post("http://localhost:3000/v1/user/auth/signup", signupData);
      toast(response.data.message,{
        onClose: () => {
          window.location.reload();
        }
      });
      // Reload the page after successful signup
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  return (
    <>
      <div className="flex">
      <div className="z-10 absolute left-11 top-7  text-2xl font-bold font-serif">
        <img src={logo} alt="" className="h- w-32" />
      </div>
      <div className="h-screen w-1/12"></div>

      {/* signup component */}

      <div className="h-screen w-4/12 bg-slate-300  relative">
        <div className="flex h-screen w-100% justify-center items-center">
          <div >
            <div className="flex">
            <h1 className="text-left text-xl font-serif font-semibold ">Welcome to </h1>
            <h1 className="ml-2 text-blue-500 text-2xl font-serif font-bold">SCATCH</h1>
            </div>
            <h2 className="w-80 text-left m-2 text-lg font-semibold font-serif">Create your account</h2>
            <InputBox type={'text'} placeholder={'username'} onchange={(e)=>{
              setSignupData({...signupData,username:e.target.value})
            }}/>
            <br />
            <InputBox type={'text'} placeholder={'email'} onchange={(e)=>{
              setSignupData({...signupData,email:e.target.value})
            }}/>
            <br />
            <InputBox type={'password'} placeholder={'password'} onchange={(e)=>{
              setSignupData({...signupData,password:e.target.value})
              console.log(signupData);
            }}/>
            <br />
            <Button1 title={"Create My Account"} onClick={handleSignup}/>
            <ToastContainer/>
          </div>
        </div>
      </div>

      {/* login component */}

      <div className="flex justify-center items-center h-screen w-1/12">
        <h1 className="bg-blue-500 rounded-full p-2 h-10 w-10 text-center text-white">Or</h1>
      </div>
      <div className="h-screen w-6/12 flex flex-grow justify-center items-center">
          <div>
          <h2 className="w-80 text-left m-2 text-lg font-semibold font-serif">Login your account</h2>
          <InputBox placeholder={"Email"} type={"text"} color={'slate'} onchange={(e)=>{
              setLoginData({...loginData,email:e.target.value})
            }}/>
          <br />
          <InputBox placeholder={"Password"} type={"password"} color={'slate'} onchange={(e)=>{
              setLoginData({...loginData,password:e.target.value})
            }}/>
          <br />
          <Button1 title={'Login'} onClick={handleSignin} />
          </div>
      </div>
      </div>
    </>
  );
};

export default Auth;



