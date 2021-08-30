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
                <div className="mb-3">home {'>'} about</div>
                <div className="mb-3">
                    <p>Hi everyone,</p>
                    
                    <p>Welcome to my ecommerce website. In this website, I have used the latest frontend and backend skills.</p>

                    <p>
                        Frontend built with React.js + Next.js, server side rendering is used for SEO friendly.<br />
                        Github repo can be found at: <a href="https://github.com/ryoyin/disc-store-frontend.git" target="_blank">https://github.com/ryoyin/disc-store-frontend.git</a>
                    </p>

                    <p>
                        Backend built with PHP Laravel and it's built in package Sanctum to handle authentication.<br />
                        Github repo can be found at: <a href="https://github.com/ryoyin/disc-store-admin.git" target="_blank">https://github.com/ryoyin/disc-store-admin.git</a>
                    </p>

                    <p>
                        Regards,<br />
                        Roy Ho<br />
                        <a href="mailto:kwanyin2000@gmail.com">kwanyin2000@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    </Layout>
  )

}

export default Home