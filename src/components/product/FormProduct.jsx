import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Label, Select, TextInput } from 'flowbite-react/lib/esm/components';
import axios from 'axios';
const validationSchema = yup.object().shape({
  sku: yup
    .string('Enter Product SKU')
    .required('SKU is required')
    .max(8, 'Must Not Exceed 8 characters'),
  catId: yup
    .number()
    .integer()
    .required('category is required'),
  name: yup
    .string('Enter Product name')
    .required('name is required'),
  price: yup
    .number()
    .min(0, 'The number must be greater than 0.')
    .required('price is required'),
  stock: yup
    .number()
    .integer()
    .required('stock is required')
    .min(0, 'The number must be greater than 0.'),
});
export default function FormProduct({ product, onSubmit }) {
  const [category, setCategory] = useState([])
  const fetchCategory = async () => {
    const { data } = await axios.get('/category')
    setCategory(data)
  }
  useEffect(() => {
    fetchCategory()
  }, [])

  let initialValues = product ? product : {
    sku: 'P000',
    catId: '',
    name: '',
    price: '',
    stock: 1,
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await onSubmit(values)
      }}
    >
      {({ values, touched, handleChange, handleSubmit, errors, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <div className="mb-1 block">
              <Label
                htmlFor="sku"
                value="SKU"
              />
            </div>
            <TextInput
              id="sku"
              name='sku'
              type="text"
              placeholder="กรอกรหัสสินค้า SKU"
              value={values.sku}
              onChange={handleChange}
              required={true}
              helperText={<p className='text-red-600'>{touched.sku || errors.sku}</p>}
              autoFocus
            />
          </div>

          <div id="select" className='mb-3'>
            <div className="mb-2 block">
              <Label
                htmlFor="countries"
                value="เลือกประเภทสินค้า"
              />
            </div>
            <Select
              id="countries"
              name='catId'
              required={true}
              value={values.catId}
              onChange={handleChange}
              helperText={<p className='text-red-600'>{touched.catId || errors.catId}</p>}
            >
              <option value='' selected disabled>-- เลือกประเภทสินค้า --</option>
              {
                category.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              }

            </Select>
          </div>
          <div className='mb-3'>
            <div className="mb-1 block">
              <Label
                htmlFor="name"
                value="ชื่อสินค้า"
              />
            </div>
            <TextInput
              id="name"
              name='name'
              type="text"
              placeholder="กรอกชื่อสินค้า"
              value={values.name}
              onChange={handleChange}
              required={true}
              helperText={<p className='text-red-600'>{touched.name || errors.name}</p>}
            />
          </div>
          <div className='mb-3'>
            <div className="mb-1 block">
              <Label
                htmlFor="price"
                value="ราคาสินค้า"
              />
            </div>
            <TextInput
              id="price"
              name='price'
              type="number"
              placeholder="กรอกราคาสินค้า"
              value={values.price}
              onChange={handleChange}
              required={true}
              helperText={<p className='text-red-600'>{touched.price || errors.price}</p>}
            />
          </div>
          <div className='mb-3'>
            <div className="mb-1 block">
              <Label
                htmlFor="stock"
                value="สต๊อก"
              />
            </div>
            <TextInput
              id="stock"
              name='stock'
              type="number"
              placeholder="กรอกสต๊อกสินค้า"
              value={values.stock}
              onChange={handleChange}
              required={true}
              helperText={<p className='text-red-600'>{touched.stock || errors.stock}</p>}
            />
          </div>
          <Button type='submit' fullSized className='mt-5'>บันทึกข้อมูล</Button>
        </form>
      )}
    </Formik>
  )
}
