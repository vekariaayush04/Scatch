import React from 'react'
import InputBox from '../ui/InputBox'

const NewProduct = () => {
  return (
    <>
        <div className='w-[1040px] '>
            <div className='m-10'>
                <h1 className='text-2xl font-semibold mb-5'>Create New Product</h1>
                <hr className=' border'/>
                <h3 className='text-xl font-semibold m-5'>Product Details</h3>
                <div className='m-5 flex'>
                    <h5 className=' font-semibold pr-4'>Product Image</h5>
                    <input type="file" className='pl-4' name="" id="" />
                </div>
                <div className='m-3'>
                <InputBox 
                    type={"text"}
                    color={'slate'}
                    placeholder={'Product Name'}
                    onchange={()=>{}}
                />
                <br />
                <input className={`m-2 w-36 p-1.5 bg-slate-300`} type='text' placeholder='Product Price' />
                <input className={`m-2 w-40 p-1.5 bg-slate-300`} type='text' placeholder='Discount Price' />
                </div>
                <div className='m-5 flex'>
                    <h5 className=' font-semibold pr-4'>Panel Details</h5>
                </div>
                <div className='m-3'>
                
                <input className={`m-2 w-40 p-1.5 bg-slate-300`} type='text' placeholder='Backgoround color' />
                <input className={`m-2 w-36 p-1.5 bg-slate-300`} type='text' placeholder='Panel color' />
                <br />
                <input className={`m-2 w-40 p-1.5 bg-slate-300`} type='text' placeholder='Text Color' />
                </div>
            </div>
        </div>
    </>
  )
}

export default NewProduct