import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Label, Select, TextInput } from 'flowbite-react/lib/esm/components';
import axios from 'axios';
const validationSchema = yup.object().shape({
  typeId: yup
    .string('Enter Category Type ID')
    .required('typeId is required')
    .max(8, 'Must Not Exceed 8 characters'),
  name: yup
    .string('Enter Category Name')
    .required('Name is required'),
});
export default function FormCategory({ category, onSubmit, onCreated }) {

  let initialValues = category ? category : {
    typeId: 'PC000',
    name: '',
  }
  if (onCreated) {
    initialValues = {
      typeId: 'PC000',
      name: '',
    }
  }
  console.log(initialValues);
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log('value on submit', values);
        await onSubmit(values)
      }}
    >
      {({ values, touched, handleChange, handleSubmit, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <div className="mb-1 block">
              <Label
                htmlFor="typeId"
                value="typeId"
              />
            </div>
            <TextInput
              id="typeId"
              name='typeId'
              type="text"
              value={values.typeId}
              onChange={handleChange}
              required={true}
              helperText={<p className='text-red-600'>{touched.typeId || errors.typeId}</p>}
              autoFocus={true}
            />
          </div>


          <div className='mb-3'>
            <div className="mb-1 block">
              <Label
                htmlFor="name"
                value="ชื่อประเภทสินค้า"
              />
            </div>
            <TextInput
              id="name"
              name='name'
              type="text"
              placeholder="กรอกชื่อประเภทสินค้า"
              value={values.name}
              onChange={handleChange}
              required={true}
              helperText={<p className='text-red-600'>{touched.name || errors.name}</p>}
            />
          </div>

          <Button type='submit' fullSized className='mt-5'>บันทึกข้อมูล</Button>
        </form>
      )}
    </Formik>
  )
}
