import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'
import Form from '../components/form/Form'
import FormInput from '../components/form/FormInput'
import FormTextArea from '../components/form/FormTextArea'
import FormImagePicker from '../components/form/FormImagePicker'
import SubmitButton from '../components/form/SubmitButton'
import Layout from '../components/Layout'
import { colors } from '../constants/colors'
import fetchApi from '../lib/fetchApi'
import useFetch from '../hooks/useFetch'
import FormSelect from '../components/form/FormSelect'
import Loading from '../components/Loading'
import { STATUS } from '../constants/status'

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required.").min(5, "Title must be at least 5 characters"),
  categoryId: Yup.string().required('Category is required.'),
  description: Yup.string().required("Description is required."),
  price: Yup.number().required("Price is required.")
})

const EditPost = ({ match }) => {
  const productId = match.params.productId
  const history = useHistory()
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const { data, isError, isLoading } = useFetch(`/api/product/detail/${productId}`)
  const { data: categories } = useFetch('/api/category')

  useEffect(() => {
    if (data) {
      setImages(data.data.product[0].images)
    }
  }, [data])

  const handleSubmit = async ({ title, categoryId, description, price, images = [], status }) => {
    const formData = new FormData()
    formData.append('productId', productId)
    formData.append('title', title)
    formData.append('categoryId', categoryId)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('status', status)

    if (images.length) {
      for (let image of images) {
        formData.append('images', image[0])
      }
    }

    const { success, data } = await fetchApi('/api/product', {
      method: 'PATCH',
      credentials: 'include',
      body: formData
    })

    if (!success) {
      return setError(data)
    }

    history.push(`/product/${data}`)
  }

  const handleDeleteImage = async (image) => {
    if (window.confirm('Are you want to delete image ?')) {
      const { success } = await fetchApi('/api/product/image', {
        method: "DELETE",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: data.data.product[0].productId,
          url: image
        })
      })

      if (success) {
        setImages(images.filter(item => item.url !== image))
      }
    }

  }

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <Container className="container content">
          <h1>Something went wrong.</h1>
        </Container>
      </Layout>
    )
  }

  const product = data.data.product[0]

  return (
    <Layout>
      <Container className="container content">
        <Title color={colors.secondary}>Post your product for deal</Title>
        {
          error && <p style={{ color: "red", textAlign: 'center', marginTop: '1rem' }}>{error}</p>
        }
        <Form
          initialValues={{
            title: product.title,
            categoryId: product.categoryId,
            description: product.description,
            price: product.price,
            images: [],
            status: product.status
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormInput placeholder="Title" name="title" />
          <FormSelect placeholder="Category" name="categoryId" items={categories && categories.data.map(category => {
            return {
              label: category.title,
              value: category.categoryId
            }
          })} />
          <FormSelect placeholder="Status" name="status" items={STATUS} />
          <FormTextArea placeholder="Description" name="description" rows={8} />
          <FormInput placeholder="Price" name="price" />
          <FormImagePicker name="images" onClick={handleDeleteImage} images={images} type="file" accept="image/*" />
          <SubmitButton title="Save" />
        </Form>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  font-size: 1.3rem;
  padding: 5rem 20rem;
`

const Title = styled.h2`
  color: ${props => props.color};
  text-align: center;
`

export default EditPost