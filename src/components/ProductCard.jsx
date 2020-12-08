import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ProgressiveImage from 'react-progressive-image'
import SoldImage from '../assets/sold.svg'
import PlaceholderImage from '../assets/placeholder-image.png'

const ProductCard = ({ product, showTitle = true }) => {
  const urlPath = `${process.env.REACT_APP_API_URL}/uploads/product/`

  return (
    <Link to={`/product/${product.slug}`}>
      <Container>
        <ImageWrapper>
          {
            product.images.length ? (
              <ProgressiveImage
                src={`${urlPath}/${product.images[0].url}`}
                placeholder={`${urlPath}/${product.images[0].thumbnail}`}
              >
                {src => <ProductImage src={src} alt={product.title} width={300} height={300}></ProductImage>}
              </ProgressiveImage>
            ) : (
                <img src={PlaceholderImage} alt="Placeholder" />
              )
          }
        </ImageWrapper>
        {
          showTitle ? (
            <Title>{product.title}</Title>
          ) : null
        }
        {/* {
          product.status === 'SOLD' ? <SoldImageStyled src={SoldImage} alt="Sold" /> : null
        } */}
      </Container>
    </Link>
  )
}

const Container = styled.div`
  position: relative;

  img {
    width: 100%;
  }
`

const ImageWrapper = styled.div`
  background-color: white;
`

const Title = styled.h3`
  font-weight: 300;
  font-size: 1.1rem;
  padding: 2rem 0;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProductImage = styled.img`
  object-fit: contain;
  max-width: 100%;
  height: 300px;
`

const SoldImageStyled = styled.img`
  width: 40px !important;
  height: 40px !important;
  position: absolute;
  top: 0;
  right: 40px;
`

export default ProductCard