import React, { useCallback, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loading from '../components/Loading'
import { useUserContext } from '../context/userContext'
import fetchApi from '../lib/fetchApi'
import Layout from '../components/Layout'


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, setUser, loading, setLoading } = useUserContext()

  const getCurrentUser = useCallback(async () => {
    const { success, data } = await fetchApi('/api/auth/me', {
      credentials: 'include'
    })

    if (success) {
      setUser(data)
    }
    setLoading(false)
  }, [setLoading, setUser])

  useEffect(() => {
    if (!user) {
      return getCurrentUser()
    }

    setLoading(false)
  }, [getCurrentUser, setLoading, user])

  return (
    <Route {...rest} render={(props) => {
      if (loading) {
        return (
          <Layout>
            <Loading />
          </Layout>
        )
      }

      return (
        user ? <Component {...props} />
          : <Redirect to="/login" />
      )
    }} />
  )
}

export default PrivateRoute