import React from 'react'
import styled from 'styled-components'

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;

  return (
    <Error>{error}</Error>
  )
}

const Error = styled.p`
  margin-top: 0.4rem;
  font-size: 1rem;
  color: red;
`

export default ErrorMessage