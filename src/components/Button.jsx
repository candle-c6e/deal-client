import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/colors'

const Button = ({ style, title, type = "default", onClick }) => {
  return (
    <ButtonStyled
      style={style}
      color={type === 'default' ? colors.primary : colors.secondary}
      onClick={onClick}
    >{title}</ButtonStyled>
  )
}

const ButtonStyled = styled.button`
  padding: 0.5rem 2rem;
  color: #fff;
  background-color: ${props => props.color}
`

export default Button