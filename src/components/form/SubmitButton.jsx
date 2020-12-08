import React from 'react'
import { useFormikContext } from 'formik'
import styled from 'styled-components'
import { colors } from '../../constants/colors'

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext()

  return (
    <Button color={colors.white} backgroundColor={colors.primary} type="submit" onClick={handleSubmit}>{title}</Button>
  )
}

const Button = styled.button`
  margin-top: 2rem;
  cursor: pointer;
  padding: 0.7rem 2rem;
  background: none;
  border: none;
  color: ${props => props.color};
  background: ${props => props.backgroundColor};
  border-radius: 5px;
  font-size: 1.2rem;
`

export default SubmitButton