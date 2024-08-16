import React, { useEffect, useState } from "react";
import InputBox from "../ui/InputBox";
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms/UserAtom";
import { useRecoilState } from "recoil";
import axios from "axios";

const NewProduct = () => {
  const [data,setData] = useState({
    imageData : {},
    productname : "",
    price : 0,
    discount : 0,
    panelcolor : "",
    bgcolor: "",
    textcolor : ""
})

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  formData.append('productImage', data.imageData);
  formData.append('productname', data.productname);
  formData.append('price', Number(data.price));
  formData.append('discount', Number(data.discount));
  formData.append('panelcolor', data.panelcolor);
  formData.append('bgcolor', data.bgcolor);
  formData.append('textcolor', data.textcolor);

  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URI}/admin/product/addProduct`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// useEffect(()=>{

// },[])
  return (
    <>
      <div className="w-[1040px] ">
        <div className="m-10">
          <h1 className="text-2xl font-semibold mb-5">Create New Product</h1>
          <hr className=" border" />
          <h3 className="text-xl font-semibold m-5">Product Details</h3>
          <div className="m-5 flex">
            <h5 className=" font-semibold pr-4">Product Image</h5>
            <form action="" encType="multipart/form-data">
              <input type="file" className="pl-4" name="productImage" id="" accept="image/png, image/jpeg" onChange={(e)=>{
                console.log(e.target.files[0]);
                setData({...data,imageData : e.target.files[0]})
              }}/>
            </form>
          </div>
          <div className="m-3">
            <InputBox
              type={"text"}
              color={"slate"}
              placeholder={"Product Name"}
              onchange={(e) => {
                setData({
                  ...data,
                  productname : e.target.value
                })
              }}
            />
            <br />
            <input
              className={`m-2 w-36 p-1.5 bg-slate-300`}
              type="text"
              placeholder="Product Price"
              onChange={(e) => {
                setData({
                  ...data,
                  price : e.target.value
                })
              }}
            />
            <input
              className={`m-2 w-40 p-1.5 bg-slate-300`}
              type="text"
              placeholder="Discount Price"
              onChange={(e) => {
                setData({
                  ...data,
                  discount : e.target.value
                })
              }}
            />
          </div>
          <div className="m-5 flex">
            <h5 className=" font-semibold pr-4">Panel Details</h5>
          </div>
          <div className="m-3">
            <input
              className={`m-2 w-40 p-1.5 bg-slate-300`}
              type="text"
              placeholder="Backgoround color"
              onChange={(e) => {
                setData({
                  ...data,
                  bgcolor:e.target.value
                })
              }}
            />
            <input
              className={`m-2 w-36 p-1.5 bg-slate-300`}
              type="text"
              placeholder="Panel color"
              onChange={(e) => {
                setData({
                  ...data,
                  panelcolor:e.target.value
                })
              }}
            />
            <br />
            <input
              className={`m-2 w-40 p-1.5 bg-slate-300`}
              type="text"
              placeholder="Text Color"
              onChange={(e) => {
                setData({
                  ...data,
                  textcolor:e.target.value
                })
              }}
              
            />
            <button onClick={handleSubmit}>add </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
