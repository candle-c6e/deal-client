import React from 'react'
import { useFormikContext } from 'formik'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'

const FormTextArea = ({ name, ...otherProps }) => {
  const { errors, setFieldTouched, touched, values, setFieldValue } = useFormikContext()

  return (
    <Container>
      <textarea
        name={name}
        onChange={(event) => setFieldValue(name, event.target.value)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        {...otherProps}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;

  textarea {
    padding: .8rem 1.1rem;
    font-size: 1rem;
  }
`

export default FormTextArea