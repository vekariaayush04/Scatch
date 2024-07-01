import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ui/ProductCard'

const Cart = () => {
  return (
    <>
    <div className='w-screen flex'>
        <div className='w-60' style={{height:'35rem'}}>
            <div className='flex m-6'>
                <h1 className='font-semibold font-serif text-md'>Sort By :</h1>
                <select name="Sort By" id="1" className=''>
                    <option value="">Popular</option>
                    <option value="">New</option>
                </select>
            </div>
            <div className='mt-8 mb-24 mx-6'>
                <Link>New Collection</Link>
                <br />
                <Link>All Products</Link>
                <br />
                <Link>Discounted Products</Link>
            </div>
            <div className='mx-6 mt-64'>
                <h2>Filter By:</h2>
                <Link>Avaibility</Link>
                <br />
                <Link>Discount</Link>
            </div>
        </div>
        <div className='flex-1 h-[35rem] overflow-y-auto flex flex-wrap justify-evenly'>
            <ProductCard title={'Bag Pack'} price={'100'}/>
            <ProductCard title={'Clinge Bag'} price={'100'}/>
            <ProductCard title={'Bag'} price={'100'}/>
            <ProductCard title={'Bag'} price={'100'}/>
            <ProductCard title={'Bag'} price={'100'}/>
            <ProductCard title={'Bag'} price={'100'}/>
            <ProductCard title={'Bag'} price={'100'}/>
            <ProductCard title={'Bag'} price={'100'}/>
            
        </div>
    </div>
    </>
  )
}

export default Cart