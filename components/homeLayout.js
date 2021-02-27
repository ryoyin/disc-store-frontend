const homeLayout = ({user}) => {
    if(user){
        return (
            
            <>{user.token}</>
            
        )
    }

    return <>loading</>
}

export default homeLayout