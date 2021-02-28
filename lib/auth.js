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
    
    const user = cookies.user

    useEffect(() => {
    
        if((!user && !isLoginPage && redirectIfFound) || (user && isLoginPage && redirectIfFound)) {
            router.push(redirectTo)
        }

    });
    
    return user

}

export {
    checkUser
}