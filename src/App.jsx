import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './hoc/PrivateRoute';
import ScrollToTop from './hoc/ScrollToTop';
import useUser from './hooks/useUser'
import EditPost from './page/EditPost';
import Home from './page/Home'
import Login from './page/Login';
import Register from './page/Register';
import Post from './page/Post';
import Product from './page/Product'
import ProductCategorty from './page/ProductCategory';
import NotFound from './page/NotFound';
import Profile from './page/Profile';
import EditProfile from './page/EditProfile';
import SearchProduct from './page/SearchProduct';
import Chat from './components/Chat';
import { useUserContext } from './context/userContext';
import useSocket from './hooks/useSocket';
import Products from './components/Products';

const App = () => {
  useUser()
  const { socket } = useSocket()
  const { user } = useUserContext()

  return (
    <Router basename='/deal'>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/product/all/:page" exact component={Products} />
        <Route path="/product/:slug" exact component={(props) => <Product {...props} socket={socket} />} />
        <Route path="/product/search/:text/:page" exact component={SearchProduct} />
        <Route path="/category/:category/:page" exact component={ProductCategorty} />
        <PrivateRoute path="/profile/:page" exact component={Profile} />
        <PrivateRoute path="/post" exact component={Post} />
        <PrivateRoute path="/edit-post/:productId" exact component={EditPost} />
        <PrivateRoute path="/edit-profile" exact component={EditProfile} />
        <Route component={NotFound} />
      </Switch>
      { user && <Chat socket={socket} />}
    </Router>
  )
}

export default App