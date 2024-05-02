import { useNavigate } from "react-router-dom"

function Redirect({ isLoggedIn }){

    const navigate = useNavigate()

    if(isLoggedIn === true){
        navigate('/user/:id')
    }
    else {
        
    }
}

export default Redirect