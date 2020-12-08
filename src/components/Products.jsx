import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useFetch from '../hooks/useFetch'
import Loading from './Loading'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import Layout from './Layout'
import Banner from './Banner'

const Products = ({ history }) => {
  const params = useParams()
  const { data, isError, isLoading } = useFetch(`/api/product/all/${params.page}`)

  if (isLoading) return <Loading />

  if (isError) return (
    <Container>
      <p>Something went wrong.</p>
    </Container>
  )

  const handleChangePage = ({ selected }) => {
    history.push(`/product/all/${selected + 1}`)
  }

  const products = data.data.products
  const totalPages = data.data.totalPages

  return (
    <Layout>
      <Banner title="ALL" />
      <Container className="container content">
        <ProductWrapper>
          {
            products.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))
          }
        </ProductWrapper>
        {
          products.length ? (
            <Pagination
              totalPages={totalPages}
              onChangePage={handleChangePage}
              forcePage={params.page - 1}
            />
          ) : null
        }
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`

const ProductWrapper = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 2rem;

  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default Products