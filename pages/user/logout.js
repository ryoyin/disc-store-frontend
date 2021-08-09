import { useCookies } from "react-cookie"
import { useFormik } from 'formik';
import { useRouter } from 'next/router'

export default function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(["disc-store"])
  const router = useRouter()

  removeCookie('user')

  router.push('/')

  return (<></>);

}