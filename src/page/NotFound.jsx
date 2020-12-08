import React from 'react'
import styled from 'styled-components'
import { ReactComponent as NotFoundLogo } from '../assets/404-error.svg'
import Layout from '../components/Layout'

const NotFound = () => {
  return (
    <Layout>
      <Container className="container content">
        <NotFoundLogo />
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

export default NotFound