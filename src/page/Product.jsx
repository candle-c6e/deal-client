import React from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
import styled from 'styled-components'
import ProgressiveImage from 'react-progressive-image'
import { useUserContext } from '../context/userContext'
import { useChatContext } from '../context/chatContext'
import fetchApi from '../lib/fetchApi'
import useFetch from '../hooks/useFetch'
import { ReactComponent as UserPlaceholder } from '../assets/profile.svg'
import PlaceholderImage from '../assets/placeholder-image.png'
import { colors } from '../constants/colors'
import Carousel from '../components/Carousel'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Loading from '../components/Loading'

const Product = ({ match, socket }) => {
  const history = useHistory()
  const { user } = useUserContext()
  const { setShowChat } = useChatContext()
  const { data, isError, isLoading } = useFetch(`/api/product/${match.params.slug}`)

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  if (isError) {
    <Redirect to="/" />
  }

  if (!data.success) {
    return <Redirect to="/not-found" />
  }

  const product = data.data.product[0]

  const handleDelete = async (productId) => {
    if (window.confirm('Are you want to delete ?')) {
      const { success } = await fetchApi('/api/product', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ productId })
      })

      if (success) {
        history.push('/')
      }
    }
  }

  const handleConnect = (productId, productUserId) => {
    if (!user) return history.push('/login')

    socket.emit('chat', {
      query: {
        userId: user.id,
        productId,
        productUserId
      }
    })

    setShowChat(true)
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta property="og:url" content={`https://jjams.co/deal/product/${product.slug}`} />
        <meta property="og:title" content={`${product.title}`} />
        <meta property="og:description" content={`${product.description}`} />
        <meta property="og:image" content={`${process.env.REACT_APP_API_URL}/uploads/product/${product.images[0].url}`} />
        <title>{product.title} | deal</title>
      </Helmet>
      <Container className="container content">
        <ProductImageWrapper>
          {
            product.images.length ? (
              <Carousel>
                {
                  product.images.map((image, index) => (
                    <ProgressiveImage
                      key={index}
                      src={`${process.env.REACT_APP_API_URL}/uploads/product/${image.url}`}
                      placeholder={`${process.env.REACT_APP_API_URL}/uploads/product/${image.thumbnail}`}
                    >
                      {src => <img src={src} alt={product.title} />}
                    </ProgressiveImage>
                  ))
                }
              </Carousel>
            ) : (
                <img src={PlaceholderImage} alt="Placeholder" />
              )
          }
        </ProductImageWrapper>
        <ProductDetail color={colors.black}>
          <ProductHeader>
            {
              data.data.action && (
                <ProductAction>
                  <Link to={`/edit-post/${product.productId}`}>
                    <Button title="Edit" type="secondary" style={{ fontSize: '1rem', marginRight: '1rem' }} />
                  </Link>
                  <Button title="Delete" style={{ fontSize: '1rem' }} onClick={() => handleDelete(product.productId)} />
                </ProductAction>
              )
            }
            <ProductHeaderInfo>
              <div>
                <Title>{product.title}</Title>
                <Status color={product.status === 'SELL' ? colors.secondary : colors.primary}>
                  <span>{product.status}</span>
                </Status>
                <PostDate>{new Date(product.createdAt).toLocaleString()}</PostDate>
              </div>
              <Price color={colors.primary}>${product.price}</Price>
            </ProductHeaderInfo>
          </ProductHeader>
          <Description>{product.description}</Description>
          <UserWrapper>
            <h4>Post by:</h4>
            <UserDetail>
              {
                product.user[0].avartar ? (
                  <img src={`${process.env.REACT_APP_API_URL}/uploads/avatar/${product.user[0].avartar}`} alt="Profile" />
                ) : (
                    <UserPlaceholder />
                  )
              }
              <UserDetailContact>
                <p>{product.user[0].name}</p>
                <Button
                  title="chat"
                  onClick={() => handleConnect(product.productId, product.userId)}
                  type="secondary"
                  style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}
                />
              </UserDetailContact>
            </UserDetail>
          </UserWrapper>
        </ProductDetail>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 6rem 0;
  font-size: 1.3rem;
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 3rem 2rem;
  }
`

const UserWrapper = styled.div`
  padding-top: 3rem;
`

const UserDetail = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  img, 
  svg {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
`

const UserDetailContact = styled.div`
  margin-left: 1rem;
`

const ProductImageWrapper = styled.div`
  flex: 0 40%;
  display: flex;
  align-items: center;
  background-color: white;

  img {
    max-width: 100%;
    height: 500px;
    object-fit: contain;
  }
`

const ProductDetail = styled.div`
  flex: 1;
  margin-left: 6rem;
  color: ${props => props.color};

  @media screen and (max-width: 768px) {
    margin-top: 2rem;
    margin-left: 0;
  }
`

const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductAction = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`

const ProductHeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Status = styled.div`
  font-size: 1rem;
  margin: 1rem 0;
  padding: .3rem;
  background-color: ${props => props.color};
  width: 4rem;
  border-radius: 1rem;
  text-align: center;
  color: #fff;
`

const PostDate = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
`

const Price = styled.p`
  font-size: 2rem;
  color: ${props => props.color};
`

const Description = styled.p`
  margin-top: 2rem;
  line-height: 1.6;
  min-height: 15rem;
`

export default Product