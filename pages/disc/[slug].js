import React, { createContext, useContext, useState, useEffect } from 'react'
import apiServer from '../../lib/server';
import { checkUser } from '../../lib/auth'
import Link from 'next/link'
import Layout from '../../layouts/layout'

DiscDetail.getInitialProps = async (ctx) => {
    // console.log(ctx.query.id)

    const categoryResponse = await fetch('http://disc.local-test.com/api/category/all')
    const cateJson = await categoryResponse.json()

    const res = await fetch(`http://disc.local-test.com/api/disc/detail/${ctx.query.slug}`)
    const discJson = await res.json()

    // console.log(discJson.relatedDiscs)
  
    return { disc: discJson, categories: cateJson }
}

function DiscDetail({disc, categories }) {

  const [showAlert, setShowAlert] = useState("d-none")
  const [alertEffect, setAlertEffect] = useState("")
  const [alertType, setAlertType] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const user = checkUser({
    isLoginPage: false,
    redirectTo: '/user/login',
    redirectIfFound: false
  })

  // console.log(user)

  const addToCart = async (e, disc_id) => {
    e.preventDefault()

    // const response = await apiServer.post('/api/cart/addItem', { user_id: user.id, disc_id: disc_id }, { headers: {"Authorization" : `Bearer ` + user.token} })

    apiServer.post('/api/cart/addItem', { user_id: user.id, disc_id: disc_id }, { headers: {"Authorization" : `Bearer ` + user.token} })
    .then(function (response) {
      console.log(response)
      setShowAlert("")
      setAlertType("success")
      setAlertMessage("This item have been added to your cart.")

      setTimeout(() => {
        setAlertEffect("fade-out", setTimeout(() => {
          setShowAlert("d-none")
          setAlertType("")
          setAlertEffect("")
          setAlertMessage("")
        }, 3000))        
      }, 100)
    })
  }

  const relatedDisc = (relatedDiscs) => {
    // console.log(relatedDiscs)
    return relatedDiscs.map(disc => 
      (
        <div className="col-xl-2 col-md-2 col-sm-4 disc mb-2">
          <div>
            <Link href={`/disc/${ disc.slug }`} as={`/disc/${ disc.slug }`}>
              <a><img className="" src={"http://disc.local-test.com/uploads/" + disc.images[0].path} alt="" /></a>
            </Link>            
          </div>
          <div>
            <Link href={`/disc/${ disc.slug }`} as={`/disc/${ disc.slug }`}>
              <a>{ disc.name } </a>
            </Link>
            <br></br>
            £ { disc.price }
          </div>
        </div>
      )
    )
  }

  return (
    <Layout user={ user } categories={ categories }>
      <div className="container">
        <div className={`alert alert-${alertType} ${showAlert} ${alertEffect}`} role="alert">{alertMessage}</div>
        <div className="row">
          <div className="mb-3">home {'>'} disc {'>'} { disc.detail.name }</div>
        </div>
        <div className="row detail mb-4">
          <div className="col-lg-7 col-md-7 mb-4">
            <img className="" src={"http://disc.local-test.com/uploads/" + disc.detail.images[0].path} alt="" />
          </div>
          <div className="col-lg-5 col-md-5">
            <div className='fw-bold mb-2'>
              { disc.detail.name } - { disc.detail.disc_format.name }
              <span className="price">£ { disc.detail.price }</span>
            </div>
            <div className='mb-2'>
              <div>Category: { disc.detail.category.name }</div>
              <div>Studio: { disc.detail.studio.name }</div>
              <div>
                <a className="add-to-cart" onClick={(e) => addToCart(e, disc.detail.id)}>add to card</a>
              </div>
            </div>
            <div>{ disc.detail.description }</div>
          </div>
        </div>
        <div className="row related-disc">
          <div className='mb-2 fw-bold'>Reltaed Disc</div>
          { relatedDisc(disc.relatedDiscs) }
        </div>
      </div>
    </Layout>
  )
}

export default DiscDetail;