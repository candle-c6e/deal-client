import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Yup from 'yup'
import Form from '../components/form/Form'
import FormInput from '../components/form/FormInput'
import SubmitButton from '../components/form/SubmitButton'
import Layout from '../components/Layout'
import { colors } from '../constants/colors'
import { useUserContext } from '../context/userContext'
import fetchApi from '../lib/fetchApi'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Username is required.').min(2, "Username must be at least 2 characters"),
  email: Yup.string().required('Email is required.').email('Email must be a valid email').min(2, "Username must be at least 2 characters"),
  username: Yup.string().required('Username is required.').min(2, "Username must be at least 2 characters"),
  password: Yup.string().required('Password is required.').min(4, "Password must be at least 4 characters")
})

const Register = ({ history }) => {
  const { setUser } = useUserContext()
  const [error, setError] = useState(null)

  const handleSubmit = async ({ name, email, username, password }) => {
    const { success, data } = await fetchApi(`/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, username, password })
    })

    if (!success) return setError(data)
    setUser(data)

    window.location.href = '/deal'
  }

  return (
    <Layout>
      <Container>
        <Title color={colors.secondary}>Register your deal account.</Title>
        {
          error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>
        }
        <Form
          initialValues={{ name: "", email: "", username: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormInput name="name" placeholder="Name" />
          <FormInput name="email" placeholder="Email" />
          <FormInput name="username" placeholder="Username" />
          <FormInput name="password" placeholder="Password" type="password" />
          <RegisterWrapper color={colors.secondary}>
            Already have an account ? <Link to="/login">login.</Link>
          </RegisterWrapper>
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

const Title = styled.h2`
  color: ${props => props.color};
  text-align: center;
  margin-bottom: 3rem;
`

const RegisterWrapper = styled.div`
  margin-top: 2rem;

  a {
    color: ${props => props.color}
  }
`

export default Register