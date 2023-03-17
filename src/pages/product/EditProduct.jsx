import React,{useState, useEffect} from 'react'
import FormProduct from '../../components/product/FormProduct'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, Button } from 'flowbite-react/lib/esm/components';

import { FaBoxOpen, FaRegEdit, FaTrashAlt } from "react-icons/fa";
export default function EditProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const fetchData = async () => {
    const { data } = await axios.get(`/products/${id}`)
    setProducts(data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const onSubmit = async (product) => {
    try {
      await axios.patch(`/products/${id}`, { ...product, catId: Number(product.catId) }, {
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
            แก้ไขสินค้า
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button outline={true} color='gray'><Link onClick={() => navigate(-1)}>กลับ</Link></Button>
      </div>

      <FormProduct product={products} onSubmit={onSubmit} />
    </>
  )
}