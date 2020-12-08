import React from 'react'
import styled from 'styled-components'
import Skeleton from '../components/Skeleton'
import { colors } from '../constants/colors'
import useFetch from '../hooks/useFetch'
import CategoryCard from './CategoryCard'

const Categories = () => {

  const { data, isLoading, isError } = useFetch('/api/category')

  if (isLoading) return (
    <Container borderColor={colors.shadowLight}>
      <Skeleton />
    </Container>
  )
  if (isError) return (
    <Container>
      <p>Something went wrong.</p>
    </Container>
  )

  return (
    <Container borderColor={colors.shadowLight}>
      {
        data && data.data.map(category => (
          <CategoryCard category={category} key={category.categoryId} />
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.borderColor};
  height: 100px;

  @media screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: auto;
    grid-gap: 1rem 0;
  }
`

export default Categories