import React from 'react'
import styled from 'styled-components'
import { BsArrowRightShort } from 'react-icons/bs'
import { colors } from '../constants/colors'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const FeatureProduct = () => {
  const { data, isError, isLoading } = useFetch('/api/product/feature-products')

  if (isLoading) return <Loading />

  if (isError) return (
    <Container>
      <p>Something went wrong.</p>
    </Container>
  )

  return (
    <Container>
      <Link to="/product/all/1">
        <SeeAll color={colors.secondary}>
          SEE ALL <BsArrowRightShort size={26} />
        </SeeAll></Link>
      <ProductWrapper>
        {
          data.data.map(product => (
            <ProductCard key={product.productId} product={product} />
          ))
        }
      </ProductWrapper>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`

const SeeAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  color: ${props => props.color}
`

const ProductWrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;

  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default FeatureProduct