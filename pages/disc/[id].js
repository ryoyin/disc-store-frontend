import React, { createContext, useContext, useState, useEffect } from 'react'
import { checkUser } from '../../lib/auth'
import Link from 'next/link'
import Layout from '../../layouts/layout'

DiscDetail.getInitialProps = async (ctx) => {
    // console.log(ctx.query.id)

    const res = await fetch(`http://disc.local-test.com/api/disc/detail/${ctx.query.id}`)
    const discJson = await res.json()
  
    return { disc: discJson }
}

function DiscDetail() {

    const user = checkUser({
        isLoginPage: false,
        redirectTo: '/user/login',
        redirectIfFound: false
    })

    return (
    <Layout user={ user }>
      <div className="container">
        <div className="row">
          
        </div>
      </div>
    </Layout>
  )
}

export default DiscDetail;