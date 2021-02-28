import { checkUser } from '../lib/auth'
import dynamic from 'next/dynamic'
import React, { createContext, useContext, useState, useEffect } from 'react'

const HomeLayout = dynamic(() => import('../components/homeLayout'),{ssr:false})

export default function Home() {
  
  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: true
  })

  return (    
    <HomeLayout user={ user } />
  )

}
