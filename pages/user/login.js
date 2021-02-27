import Head from 'next/head'
import apiServer from '../../lib/server';
import { useCookies } from "react-cookie"
import { useFormik } from 'formik';
import { useRouter } from 'next/router'
import { checkUser } from '../../lib/auth'

export default function Login() {

  const [cookies, setCookie, removeCookie] = useCookies(["disc-store"])
  const router = useRouter()
    
  const user = checkUser({
    isLoginPage: true,
    redirectTo: "/",
    redirectIfFound: true,
  })

  // if(user) router.push('/')

  // console.log(cookies.token)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      device_name: 'next.js',
    },
    onSubmit: values => {
      apiServer
        .post('/api/sanctum/token', values)
        .then(response => {
          console.log('show response');
          console.log(response);
          let user = {
            token: response.data
          }
          setCookie('user', JSON.stringify(user), {
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // Expires after 1hr
            sameSite: true,
          })
          router.push('/')
        });
    },
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/ >
        <meta name="description" content="" />
        <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors" />
        <meta name="generator" content="Hugo 0.80.0" />
        <title>Signin Template · Bootstrap v5.0</title>
      </Head>
      <div className="text-center">
        <main className="form-signin">
          <form onSubmit={formik.handleSubmit}>
            
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            
            <label htmlFor="inputEmail" className="visually-hidden">Email address</label>            
            <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email address" className="form-control" required autoFocus />

            <label htmlFor="inputPassword" className="visually-hidden">Password</label>
            <input id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" className="form-control" required />

            <input id="device_name" name="device_name" type="hidden" value={formik.values.device_name} />

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; 2021 Disc Store</p>
      
            {/* <button type="submit">Submit</button> */}
          
          </form>
        </main>
      </div>
      <style jsx>{`
          .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          @media (min-width: 768px) {
            .bd-placeholder-img-lg {
              font-size: 3.5rem;
            }
          }
        `}
      </style>
    </>
  )
}
