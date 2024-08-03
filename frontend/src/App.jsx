import { useState } from "react";
import { BrowserRouter , createBrowserRouter, Route , RouterProvider, Routes } from "react-router-dom"
import { RecoilRoot } from 'recoil'
import "./App.css";
import Auth from "./components/Auth";
import Home from "./components/user/Home";
import MyAccount from "./components/MyAccount";
import Shop from "./components/user/Shop";
import Item from "./components/ui/Item";
import Cart from "./components/user/Cart";
import Admin from "./components/admin/Admin";
import AdminHome from "./components/admin/AdminHome";
import NewProduct from "./components/admin/NewProduct";

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
    },{
      path: "/admin",
      element :<Admin/>,
      children : [
        {
          path:"",
          element:<AdminHome/>,
          children: [
            {
              path:"",
              element : <NewProduct/>
            },
            {
              path:"/admin/create-new-product",
              element : <NewProduct/>
            },
            
          ]
        }
      ]
    }
  ])

  return (
    <RecoilRoot>
      <RouterProvider router={router}/>
    </RecoilRoot>
  );
}

export default App;
