import { useEffect } from "react";
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'

const checkUser = ({ 
    isLoginPage = false,
    redirectTo = false,
    redirectIfFound = false
}) => {

    const router = useRouter()

    const [cookies, setCookie, removeCookie] = useCookies(["disc-store"])

    useEffect(() => {

        const user = cookies.user
    
        if(!user && !isLoginPage) {
            router.push('/user/login')
            // console.log('planning redirect')
        } 
        
        if(user && isLoginPage) {
            router.push('/')
        }

    });
    
    return cookies.user

}

export {
    checkUser
}