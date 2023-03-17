import React from 'react'
import FormProduct from '../../components/product/FormProduct'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb,Button } from 'flowbite-react/lib/esm/components';

import { FaBoxOpen, FaRegEdit, FaTrashAlt } from "react-icons/fa";
export default function AddProduct() {
  const navigate = useNavigate()
  const onSubmit = async (product) => {
    try {
      await axios.post('/products', { ...product, catId: Number(product.catId) }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      navigate('/product')
    } catch (error) {
      alert(error.response.data.msg)
    }
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item
            href="#!"
            icon={FaBoxOpen}
          >
            <Link to='/product'>จัดการสินค้า</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#!">
            เพิ่มสินค้า
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button outline={true} color='gray'><Link onClick={()=>navigate(-1)}>กลับ</Link></Button>
      </div>

      <FormProduct product={null} onSubmit={onSubmit} />
    </>
  )
}
