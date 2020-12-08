import React from 'react'
import styled from 'styled-components'
import Skeleton from '../components/Skeleton'

const Loading = () => {
  return (
    <Container className="container content">
      <Skeleton type="code" />
      <Skeleton type="code" />
      <Skeleton type="code" />
    </Container>
  )
}

const Container = styled.div`
  width: 50%; 
  margin-top: 5rem;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export default Loading