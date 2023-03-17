import axios from 'axios';
import { Breadcrumb, Table, Button } from 'flowbite-react/lib/esm/components'
import React, { useEffect, useState } from 'react'

import { FaBoxOpen, FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function Products() {
  const [products, setProducts] = useState([])
  const fetchData = async () => {
    const { data } = await axios.get(`/products`)
    setProducts(data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const deleteProduct = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าจะลบสินค้านี้')) {
      try {
        await axios.delete(`/products/${id}`)
        fetchData()
      } catch (error) {
        alert(error.response.data.msg)
      }
    }
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item
            href="#"
            icon={FaBoxOpen}
          >
            จัดการสินค้า
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            สินค้าทั้งหมด ({products.length})
          </Breadcrumb.Item>
        </Breadcrumb>
        <Link to='/product/add'><Button>+ เพิ่มสินค้า</Button></Link>
      </div>
      <Table striped={true} hoverable={true} className='border border-1 mt-2'>
        <Table.Head className='border border-b-3'>
          <Table.HeadCell>
            รหัสสินค้า SKU
          </Table.HeadCell>
          <Table.HeadCell>
            ชื่อสินค้า
          </Table.HeadCell>
          <Table.HeadCell>
            ประเภท
          </Table.HeadCell>
          <Table.HeadCell>
            ราคา
          </Table.HeadCell>
          <Table.HeadCell>
            สต๊อก
          </Table.HeadCell>
          <Table.HeadCell>

          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            products.map(product => (
              <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='font-bold'>
                  {product.sku}
                </Table.Cell>
                <Table.Cell>
                  {product.name}
                </Table.Cell>
                <Table.Cell>
                  {product.category.name}
                </Table.Cell>
                <Table.Cell>
                  {product.price.toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {product.stock}
                </Table.Cell>
                <Table.Cell className='flex justify-end'>
                  <Link to={`/product/${product.id}/edit`}>
                    <Button
                      outline={true}
                      color="warning"
                      size='xs'
                      className='mr-1'
                    >
                      <FaRegEdit size={17}></FaRegEdit>
                      แก้ไข
                    </Button>
                  </Link>
                  <Button
                    outline={true}
                    color="failure"
                    size='xs'
                    onClick={()=>deleteProduct(product.id)}
                  >
                    <FaTrashAlt size={15}></FaTrashAlt>
                    ลบ
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          }

        </Table.Body>
      </Table>
    </>
  )
}
