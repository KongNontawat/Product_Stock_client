import { Modal } from 'flowbite-react/lib/esm/components/Modal'
import React from 'react'
import { Button } from 'flowbite-react/lib/esm/components/Button';
import FormCategory from './FormCategory';
import axios from 'axios';
export default function ModalCreate({ toggleModal, setModal, category, onEdit, onCreated }) {
  const catData = category.filter(cat=>cat.id==onEdit)
  const onSubmit = async (catValue) => {
    if (onCreated) {
      console.log('created');
      try {
        await axios.post('/category', catValue, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        setModal(false)
      } catch (error) {
        alert(error.response.data.msg)
      }
    } else {
      console.log('update');
      try {
        await axios.patch(`/category/${onEdit}`, catValue, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        setModal(false)
      } catch (error) {
        alert(error.response.data.msg)
      }
    }
  }
  return (
    <>
      <Modal
        dismissible={true}
        show={toggleModal}
        onClose={() => setModal(false)}
      >
        <Modal.Header>
          {onCreated ? 'เพิ่มประเภทสินค้า' : 'แก้ไขประเภทสินค้า'}
        </Modal.Header>
        <Modal.Body>
          <FormCategory category={onCreated ? null : catData[0]} onSubmit={onSubmit} onCreated={onCreated}/>
        </Modal.Body>
      </Modal>
    </>
  )
}
