import axios from 'axios';
import { Breadcrumb, Table, Button } from 'flowbite-react/lib/esm/components'
import React, { useEffect, useState } from 'react'

import { FaBoxOpen, FaRegEdit, FaTrashAlt,FaThList } from "react-icons/fa";
import { Link } from 'react-router-dom';
import ModalCreate from '../../components/category/ModalCreate';
export default function Category() {
  const [category, setCategory] = useState([])
  const [toggleModal,setToggleModal] = useState(false)
  const [onEdit, setOnEdit]= useState()
  const [onCreated, setOnCreated] = useState(false)
  const fetchData = async () => {
    const { data } = await axios.get(`/category`)
    setCategory(data)
  }
  useEffect(() => {
    fetchData()
  }, [toggleModal])
  const deleteCategory = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าจะลบสินค้านี้')) {
      try {
        await axios.delete(`/category/${id}`)
        fetchData()
      } catch (error) {
        alert(error.response.data.msg)
      }
    }
  }
  const setModal = ()=> {
    setToggleModal(false)
  }
  return (
    <>
      <ModalCreate toggleModal={toggleModal} setModal={setModal} category={category} onEdit={onEdit} onCreated={onCreated}/>
      <div className='flex items-center justify-between'>
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item
            href="#"
            icon={FaThList}
          >
            จัดการประเภทสินค้า
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">
            ประเภทสินค้าทั้งหมด ({category.length})
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={()=>(setToggleModal(!toggleModal),setOnCreated(true))}>+ เพิ่มประเภทสินค้า</Button>
      </div>
      <Table striped={true} hoverable={true} className='border border-1 mt-2'>
        <Table.Head className='border border-b-3'>
          <Table.HeadCell>
            รหัสประเภท
          </Table.HeadCell>
          <Table.HeadCell>
            ชื่อประเภทสินค้า
          </Table.HeadCell>
          <Table.HeadCell>

          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            category.map(cat => (
              <Table.Row key={cat.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='font-bold w-[130px]'>
                  {cat.typeId}
                </Table.Cell>
                <Table.Cell>
                  {cat.name}
                </Table.Cell>
                <Table.Cell className='flex justify-end'>
                    <Button
                      outline={true}
                      color="warning"
                      size='xs'
                      className='mr-1'
                      onClick={()=>(
                        setToggleModal(true),
                        setOnEdit(cat.id),
                        setOnCreated(false)
                      )}
                    >
                      <FaRegEdit size={17}></FaRegEdit>
                      แก้ไข
                    </Button>
                  <Button
                    outline={true}
                    color="failure"
                    size='xs'
                    onClick={()=>deleteCategory(cat.id)}
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
