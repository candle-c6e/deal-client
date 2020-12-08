import React from 'react'
import styled from 'styled-components'
import { useFormikContext } from 'formik'
import ErrorMessage from './ErrorMessage'

const FormSelect = ({ name, items, placeholder, ...otherProps }) => {
  const { errors, setFieldTouched, touched, values, setFieldValue } = useFormikContext()

  return (
    <Container>
      <select
        name={name}
        onChange={(event) => setFieldValue(name, event.target.value)}
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        {...otherProps}
      >
        <option>Please select {String(placeholder).toLowerCase()}</option>
        {
          items ? (
            items.map(item => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))
          ) : null
        }
      </select>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;

  select {
    padding: .8rem 1.1rem;
    font-size: 1rem;
  }
`

export default FormSelect