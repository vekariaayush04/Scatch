import { useState } from "react";
import { BrowserRouter , createBrowserRouter, Route , RouterProvider, Routes } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/Home";
import MyAccount from "./components/MyAccount";
import Shop from "./components/Shop";
import Item from "./components/ui/Item";
import Cart from "./components/Cart";

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
        },
        {
          path:"product/:id",
          element:<Item/>
        },
        {
          path:"/cart",
          element:<Cart/>
        }
      ]
    },
    {
      path: "/auth",
      element :<Auth/>
    }
  ])

  return (
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  );
}

export default App;
