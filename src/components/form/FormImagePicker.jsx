import React from 'react'
import { useFormikContext } from 'formik'
import { AiOutlineCamera } from 'react-icons/ai'
import styled from 'styled-components'
import ErrorMessage from './ErrorMessage'
import { colors } from '../../constants/colors'

const FormImagePicker = ({ name, images, onClick, ...otherProps }) => {
  const { errors, setFieldTouched, touched, values, setFieldValue } = useFormikContext()

  const handleDelete = filename => {
    const filterFile = values[name].filter((item) => item[0].name !== filename)
    setFieldValue(name, filterFile)
  }

  return (
    <Container>
      <ImagePreviewWrapper>
        {
          images && images.length ? (
            images.map((image, index) => {
              return (
                <img key={index} onClick={() => onClick(image.url)} src={`${process.env.REACT_APP_API_URL}/uploads/product/${image.url}`} alt={image.url} />
              )
            })
          ) : null
        }
        {
          values[name].length ? (
            values[name].map((image, index) => {
              return (
                <img key={index} onClick={() => handleDelete(image[0].name)} src={URL.createObjectURL(image[0])} alt={index} />
              )
            })
          ) : null
        }
        <ImagePlaceholderWrapper>
          <ImagePlaceholder htmlFor={name} backgroundColor={colors.white}>
            <AiOutlineCamera size={40} color={colors.primary} />
          </ImagePlaceholder>
        </ImagePlaceholderWrapper>
        <input
          id={name}
          name={name}
          onChange={(event) => event.target.files.length ? setFieldValue(name, [...values[name], event.target.files]) : null}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
        />
      </ImagePreviewWrapper>
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 2rem;

  input {
    display: none;
    padding: .8rem 1.1rem;
    font-size: 1rem;
  }
`

const ImagePreviewWrapper = styled.div`
  display: flex;
  overflow-x: scroll;

  img {
    cursor: pointer;
    margin-right: 1rem;
    border-radius: 1rem;
    width: 5rem;
    height: 5rem;
  }
`

const ImagePlaceholderWrapper = styled.div`
  width: 5rem;
  height: 5rem;
`

const ImagePlaceholder = styled.label`
  cursor: pointer;
  width: 5rem;
  height: 5rem;
  background-color: ${props => props.backgroundColor};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default FormImagePicker