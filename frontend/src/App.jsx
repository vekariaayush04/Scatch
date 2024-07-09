import { useState } from "react";
import { BrowserRouter , createBrowserRouter, Route , RouterProvider, Routes } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import MyAccount from "./components/MyAccount";
import Shop from "./components/Shop";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "",
      element : <Home/>,
      children:[
        {
          path:"",
          element:<Shop/>
        },
        {
          path:"/MyAccount",
          element:<MyAccount/>
        }
      ]
    },
    {
      path: '/user/auth',
      element :<Auth/>
    }
  ])

  return (
    <RecoilRoot>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/user/auth" element={<Auth/>}/>
          <Route path="/user/home" element={<Home/>}/>
          <Route path="/user/MyAccount" element={<MyAccount/>}/>
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router}/>
    </RecoilRoot>
  );
}

export default App;
