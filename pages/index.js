import { checkUser } from '../lib/auth'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../layouts/layout'
import DiscList from '../components/discList'

Home.getInitialProps = async (ctx) => {
  const res = await fetch('http://disc.local-test.com/api/discs/all')
  const json = await res.json()
  return { discs: json }
}


function Home({discs}) {
  
  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: false
  })
  
  console.log(user)
  console.log(discs)

  
  return (
    <Layout user={ user }>
      <div class="row">
        <DiscList discs={discs || []}></DiscList>
      </div>
    </Layout>
  )

}

export default Home