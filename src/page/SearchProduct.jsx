import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import useFetch from '../hooks/useFetch'
import Layout from '../components/Layout'
import Banner from '../components/Banner'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const SearchProduct = ({ history }) => {
  const params = useParams()
  const { data, isError, isLoading } = useFetch(`/api/product/search/${params.text}/${params.page}`)

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (isError) return (
    <Container>
      <p>Something went wrong.</p>
    </Container>
  )

  const products = data.data.products
  const totalPages = data.data.totalPages

  const handleChangePage = ({ selected }) => {
    history.push(`/product/search/${params.text}/${selected + 1}`)
  }

  return (
    <Layout>
      <Banner title={params.text} />
      <Container className="container content">
        <ProductWrapper>
          {
            products.length ? (
              products.map(product => (
                <ProductCard key={product.productId} product={product} />
              ))
            ) : (
                <h1>Not Found.</h1>
              )
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

const Container = styled.div``

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

export default SearchProduct