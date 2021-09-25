import apiServer from '../lib/server';
import { checkUser } from '../lib/auth'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../layouts/layout'
import DiscList from '../components/discList'

export async function getServerSideProps(ctx) {
  const categoryResponse = await fetch('http://disc.local-test.com/api/category/all')
  const cateJson = await categoryResponse.json()

  return {
    props: { categories:cateJson  }, // will be passed to the page component as props
  }
}

function Home({categories }) { 
  
  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: false
  })

  const CartBlock = () => {
    if (user) {
      
      useEffect(() => {
        fetch('http://disc.local-test.com/api/cart/listItem/' + user.id, { headers: {"Authorization" : `Bearer ` + user.token} })
        .then(response => response.json())
        .then(data => console.log(data));
        
      }, []);

      return (
        <>
          Your Shopping cart is empty.
        </>
      )

    } else {     

      useEffect(() => {
        window.setTimeout(function() {
          window.location.href = '/user/login';
        }, 3000);
      }, []);

      return (
        <>Please login first. You will be redirect to the login page in 3 second.</>
      )
    }

  }

  return (
    <Layout user={ user } categories={ categories }>
      <div className="container">
        <div className="row">
          <div className="mb-3">home {'>'} cart</div>
          <div className="mb-3">
              <CartBlock />
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default Home