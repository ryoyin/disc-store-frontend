import { checkUser } from '../lib/auth'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../layouts/layout'

export default function Home() {
  
  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: false
  })
  
  console.log(user)


  return (
    <Layout user={ user }>
      <div>test</div>
    </Layout>
  )

}

