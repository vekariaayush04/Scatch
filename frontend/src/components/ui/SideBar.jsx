import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = ({isAdmin}) => {

  if(isAdmin){
    return (
      <div className='w-60 border border-r-2' style={{ height: '35rem' }}>
          <div className='mt-8 mb-24 mx-6'>
            <Link to="/admin/all-products">All Products</Link>
            <br />
            <Link to="/admin/create-new-product">Create New Product</Link>
          </div>
        </div>
    )
  }

  return (
    <div className='w-60' style={{ height: '35rem' }}>
          <div className='flex m-6'>
            <h1 className='font-semibold font-serif text-md'>Sort By :</h1>
            <select name="Sort By" id="1" className=''>
              <option value="">Popular</option>
              <option value="">New</option>
            </select>
          </div>
          <div className='mt-8 mb-24 mx-6'>
            <Link to="/new-collection">New Collection</Link>
            <br />
            <Link to="/all-products">All Products</Link>
            <br />
            <Link to="/discounted-products">Discounted Products</Link>
          </div>
          <div className='mx-6 mt-64'>
            <h2>Filter By:</h2>
            <Link to="/availability">Availability</Link>
            <br />
            <Link to="/discount">Discount</Link>
          </div>
        </div>
  )
}

export default SideBar