import React, { useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import Form from '../components/form/Form'
import FormInput from '../components/form/FormInput'
import SubmitButton from '../components/form/SubmitButton'
import Layout from '../components/Layout'
import { useUserContext } from '../context/userContext'
import fetchApi from '../lib/fetchApi'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Username is required.').min(2, "Username must be at least 2 characters"),
  username: Yup.string().required('Username is required.').min(2, "Username must be at least 2 characters"),
  password: Yup.string().notRequired(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

const EditProfile = () => {
  const { user } = useUserContext()
  const [error, setError] = useState(null)

  const handleSubmit = async ({ name, username, password }) => {
    const { success, data } = await fetchApi(`/api/auth/edit-profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name, username, password })
    })

    if (!success) return setError(data)

    window.location.href = '/deal'
  }

  return (
    <Layout>
      <Container>
        {
          error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>
        }
        <Form
          initialValues={{ name: user.name, email: user.email, username: user.username, password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormInput name="name" placeholder="Name" />
          <FormInput name="email" disabled placeholder="Email" />
          <FormInput name="username" placeholder="Username" />
          <FormInput name="password" placeholder="Password" type="password" />
          <FormInput name="confirmPassword" placeholder="Confirm Password" type="password" />
          <SubmitButton title="Register" />
        </Form>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  font-size: 1.2rem;
  padding-top: 8rem;
  margin: 0 auto;
  max-width: 500px;
`

export default EditProfile