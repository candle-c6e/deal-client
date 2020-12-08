import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../constants/colors'
import { useUserContext } from '../context/userContext'
import useFetch from '../hooks/useFetch'
import fetchApi from '../lib/fetchApi'
import Pagination from '../components/Pagination'
import Layout from '../components/Layout'
import ProfilePlaceholder from '../assets/placeholder-image.png'
import Loading from '../components/Loading'
import ProductCard from '../components/ProductCard'
import Button from '../components/Button'

const Profile = ({ history }) => {
  const params = useParams()
  const { user } = useUserContext()

  const { data, isLoading } = useFetch(`/api/product/user/${params.page}`)

  const handleChangeAvatar = async (event) => {
    const files = event.target.files

    if (files.length) {
      const formData = new FormData()

      formData.append('image', files[0])

      const { success } = await fetchApi('/api/auth/edit-avatar', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      if (success) {
        window.location.reload()
      }
    }
  }

  const handleChangePage = ({ selected }) => {
    history.push(`/profile/${selected + 1}`)
  }

  return (
    <Layout>
      <Container className="container content">
        <ProfileInfo>
          <ProfileAvatar>
            <img src={user.avatar ? `${process.env.REACT_APP_API_URL}/uploads/avatar/${user.avatar}` : ProfilePlaceholder} alt="Profile" />
            <input type="file" onChange={handleChangeAvatar} style={{ display: 'none' }} />
          </ProfileAvatar>
          <ProfileName>{user.name}</ProfileName>
          <ProfileEmail color={colors.gray}>{user.email}</ProfileEmail>
          <Link to="/edit-profile">
            <Button style={{ marginTop: '1rem' }} title="Edit profile" />
          </Link>
        </ProfileInfo>
        <div>
          <ProfileListing>
            {
              isLoading ? (
                <Loading />
              ) : (
                  data && data.data.products.length ? (
                    data.data.products.map(product => (
                      <ProductCard key={product.productId} product={product} showTitle={false} />
                    ))
                  ) : (
                      <h3>Not found.</h3>
                    )
                )
            }
          </ProfileListing>
          {
            data && data.data.products.length ? (
              <Pagination
                totalPages={data.data.totalPages}
                onChangePage={handleChangePage}
                forcePage={params.page - 1}
              />
            ) : null
          }
        </div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  font-size: 1.3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ProfileInfo = styled.div`
  padding: 2rem 0;

  @media screen and (max-width: 768px) {
    padding: 2rem 0 5rem 0;
    text-align: center;
  }
`

const ProfileName = styled.p`
  margin-top: 2rem;
  font-weight: 400;
  font-size: 1.4rem;
`

const ProfileEmail = styled.p`
  font-size: 1.2rem;
  color: ${props => props.color};
`

const ProfileAvatar = styled.label`
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 260px;
    height: 260px;
  }

  @media screen and (max-width: 768px) {
    img {
      width: 160px;
      height: 160px;
    }
  }
`

const ProfileListing = styled.div`
  flex: 1;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-left: 3rem;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;

    a {
      flex: 1;
    }

    div {
      width: 200px;
    }
  }
`

export default Profile