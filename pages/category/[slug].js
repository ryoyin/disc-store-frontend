import apiServer from '../../lib/server';
import { checkUser } from '../../lib/auth'
import React, { createContext, useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../layouts/layout'
import DiscList from '../../components/discList'

export async function getServerSideProps(ctx) {
  const categoryResponse = await fetch('http://disc.local-test.com/api/category/all')
  const cateJson = await categoryResponse.json()

  const discResponse = await fetch(`http://disc.local-test.com/api/category/${ ctx.query.slug }/discs`)
  const discJson = await discResponse.json()

  return {
    props: { discs: discJson, categories:cateJson, slug: ctx.query.slug }, // will be passed to the page component as props
  }
}

function Category({discs, categories, slug }) { 
  
  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: false
  })

  return (
    <Layout user={ user } categories={ categories }>
      <div className="container">
        <div className="row">
            <div className="mb-3">home {'>'} categories {'>'} { slug } </div>
            <DiscList discs={discs || []}></DiscList>
        </div>
      </div>
    </Layout>
  )

}

export default Category