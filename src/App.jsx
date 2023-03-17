import { useState } from 'react'
import { Button } from 'flowbite-react/lib/esm/components/Button'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Products from './pages/product/Products'
import './index.css'
import Category from './pages/category/Category';
import axios from 'axios'
import { FaBoxOpen, FaThList } from "react-icons/fa";
import AddProduct from './pages/product/AddProduct'
import EditProduct from './pages/product/EditProduct'

axios.defaults.baseURL = import.meta.env.VITE_APP_API
console.log()

function App() {

  return (
    <BrowserRouter>
      <div className='container mx-auto max-w-[1000px] mt-8'>
        <h2 className='text-4xl font-bold text-center'>ระบบจัดการสต๊อกสินค้า CRUD</h2>
        <h4 className='text-xl font-bold text-center text-blue-700 mt-3'>React, Nodejs, Mysql, Prisma, Formik, Tailwindcss</h4>
        <div className='text-center' >
          <div className="inline-flex rounded-md shadow-sm my-5" role="group">
            <NavLink to='/product' className={({isActive})=>isActive ? 'inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white':'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 rounded-l-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white'} >
              <FaBoxOpen size={30} />
              <p className='text-lg ml-2'>จัดการสินค้า</p>
            </NavLink>
            <NavLink to='/category' className={({isActive})=>isActive ? 'inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-gray-900 rounded-r-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white':'inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white'} >
              <FaThList size={25} />
              <p className='text-lg ml-2'>จัดการประเภทสินค้า</p>
            </NavLink>
          </div>
        </div>
        <Routes>
          <Route path='/' index element={<Products />}></Route>
          <Route path='/product' element={<Products />}></Route>
          <Route path='/product/add' element={<AddProduct />}></Route>
          <Route path='/product/:id/edit' element={<EditProduct />}></Route>

          <Route path='/category' element={<Category />}></Route>
        </Routes>

      </div>

    </BrowserRouter>
  )
}

export default App
