import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Singup({ setIsLoggedIn }) {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")

    function createdNewUser(e) {
        e.preventDefault()
    }

    return (
        <>
            <div>
                <img src="/Logo.png" />
                <h1>InstaVibe</h1>
            </div>
            <div>
                <h2>Please type in information to create account:</h2>
                <form onSubmit={(e) => createdNewUser(e)}>
                    <h3>Username:</h3>
                    <input id="username" autoComplete="off" onChange={(e) => setUserName(e.target.value)} />
                    <h3>Email:</h3>
                    <input id="email" autoComplete="email" onChange={(e) => setUserEmail(e.target.value)} />
                    <h3>Password:</h3>
                    <input id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                    <h3>Verify Password:</h3>
                    <input id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Singup