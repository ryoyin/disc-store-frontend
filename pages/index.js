import apiServer from '../lib/server';
import { checkUser } from '../lib/auth'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../layouts/layout'
import DiscList from '../components/discList'

export async function getServerSideProps(ctx) {
  const categoryResponse = await fetch('http://disc.local-test.com/api/category/all')
  const cateJson = await categoryResponse.json()

  const discResponse = await fetch('http://disc.local-test.com/api/disc/all')
  const discJson = await discResponse.json()

  return {
    props: { discs: discJson, categories:cateJson  }, // will be passed to the page component as props
  }
}

// Home.getInitialProps = async (ctx) => {
//   const res = await fetch('http://disc.local-test.com/api/disc/all')
//   const discJson = await res.json()

//   // get user detail
//   // const userDetailResponse = await apiServer.get('/api/user/detail', { headers: {"Authorization" : `Bearer 12|OOtmjjgdp8IgqdlefQq2GF9v8cTDy04N6vfDJovY`} })
//   // console.log(userDetailResponse)

//   return { discs: discJson }
// }

function Home({discs, categories }) { 
  
  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: false
  })

  return (
    <Layout user={ user } categories={ categories }>
      <div className="container">
        <div className="row">
          <div className="mb-3">home</div>
          <DiscList discs={discs || []}></DiscList>
        </div>
      </div>
    </Layout>
  )

}

export default Home