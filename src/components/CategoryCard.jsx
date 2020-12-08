import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const CategoryCard = ({ category }) => {
  return (
    <Card to={`/category/${category.title}/1`}>
      <Image src={category.image} alt={category.title} />
      <Title>{category.title}</Title>
    </Card>
  )
}

const Card = styled(Link)`
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  margin: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Title = styled.p`
  margin-top: 0.5rem;
`

export default CategoryCard