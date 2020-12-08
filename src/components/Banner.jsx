import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/colors'

const Banner = ({ title }) => {
  return (
    <Container color={colors.primary}>
      <h1>{String(title).toUpperCase()}</h1>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 5px;
  background-color: ${props => props.color};
  height: 220px;
  font-size: 2rem;
  color: #fff;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    height: 160px;
  }
`

export default Banner