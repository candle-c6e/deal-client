import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'
import fetchApi from '../lib/fetchApi'
import useFetch from '../hooks/useFetch'
import Layout from '../components/Layout'
import { colors } from '../constants/colors'
import Form from '../components/form/Form'
import FormInput from '../components/form/FormInput'
import FormTextArea from '../components/form/FormTextArea'
import FormImagePicker from '../components/form/FormImagePicker'
import SubmitButton from '../components/form/SubmitButton'
import FormSelect from '../components/form/FormSelect'

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required.").min(5, "Title must be at least 5 characters"),
  categoryId: Yup.string().required('Category is required.'),
  description: Yup.string().required("Description is required."),
  price: Yup.number().required("Price is required."),
  images: Yup.array().required().min(1, "Images must have at least 1 items")
})

const Post = () => {
  const history = useHistory()
  const { data: categories } = useFetch('/api/category')

  const handleSubmit = async ({ title, categoryId, description, price, images = [] }) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('categoryId', categoryId)
    formData.append('description', description)
    formData.append('price', price)

    if (images.length) {
      for (let image of images) {
        formData.append('images', image[0])
      }
    }

    const { success, data } = await fetchApi('/api/product', {
      method: 'POST',
      credentials: 'include',
      body: formData
    })

    if (success) {
      history.push(`/product/${data}`)
    }
  }

  return (
    <Layout>
      <Container className="container content">
        <Title color={colors.secondary}>Post your product for deal</Title>
        <Form
          initialValues={{ title: '', categoryId: '', description: '', price: '', images: [] }}
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
          <FormTextArea placeholder="Description" name="description" rows={5} />
          <FormInput placeholder="Price" name="price" />
          <FormImagePicker name="images" type="file" accept="image/*" />
          <SubmitButton title="Post" />
        </Form>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  font-size: 1.3rem;
  padding: 5rem 20rem;

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
`

const Title = styled.h2`
  color: ${props => props.color};
  text-align: center;
`

export default Post