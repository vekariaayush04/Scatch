import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button1 from "./ui/Button1";
import InputBox from "./ui/InputBox";
import axios from 'axios';

const Auth = () => {

  const navigate = useNavigate()
  const [ signupData , setSignupData] = useState({
    username:"",
    email:"",
    password:""
  })

  const [ loginData , setLoginData] = useState({
    email:"",
    password:""
  })

  return (
    <>
      <div className="flex">
      <div className="z-10 absolute left-16 top-7  text-2xl font-bold font-serif">
        Scatch
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
            <Button1 title={"Create My Account"} onClick={async ()=>{
              try {
                const response = await axios.post("http://localhost:3000/v1/user/auth/signup", signupData);
                toast(response.data.message,{
                  onClose: () => {
                    window.location.reload();
                  }
                });
                // Reload the page after successful signup
              } catch (error) {
                toast.error("Signup failed",{
                  onClose: () => {
                    window.location.reload();
                  }
                });
              }
            }}/>
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
          <Button1 title={'Login'} onClick={async ()=>{
              try {
                const data = await axios.post("http://localhost:3000/v1/user/auth/login",loginData)
                console.log(data);
                localStorage.setItem("token",data.data.token)
                navigate('/');  
              } catch (error) {
                toast.error("Login failed",{
                  onClose: () => {
                    window.location.reload();
                  }
                });
              }           
            }} />
          </div>
      </div>
      </div>
    </>
  );
};

export default Auth;
