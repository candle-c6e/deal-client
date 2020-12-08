import React from 'react'
import HeroBanner from '../components/HeroBanner'
import Categories from '../components/Categories'
import FeatureProduct from '../components/FeatureProduct'
import Layout from '../components/Layout'

const Home = () => {

  return (
    <Layout>
      <HeroBanner />
      <div className="container content">
        <Categories />
        <FeatureProduct />
      </div>
    </Layout>
  )
}

export default Home