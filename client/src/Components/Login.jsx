import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login({ setIsLoggedIn }) {

    const [loginUser, setLoginUser] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const navigate = useNavigate()

    function logIn(e) {
        e.preventDefault()
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    username: loginUser,
                    password: loginPassword
                }
            )
        })
            .then(r => {
                if (r.ok) {
                    const userId = r.id
                    setLoginPassword("")
                    setLoginUser("")
                    navigate(`user/${userId}`)
                    setIsLoggedIn(true)
                    return r.json()
                }
                else {
                    alert("Not Valid Login")
                    return undefined
                }
            })
            .catch(error => {
                alert("Something went wrong. Please try again.")
                console.error('Login failed:', error)
            })
    }

    return (
        <>
            <div>
                <img src="/Logo.png" />
                <h1>InstaVibe</h1>
            </div>
            <div>
                <h2>Welcome to InstaVibe!</h2>
                <form onSubmit={(e) => logIn(e)}>
                    <h3>Username:</h3>
                    <input id="username" autoComplete="username" onChange={(e) => setLoginUser(e.target.value)} />
                    <h3>Password:</h3>
                    <input id="password" autoComplete="current-password" type="password" onChange={(e) => setLoginPassword(e.target.value)} />
                    <button type="submit">Log In</button>
                </form>
                <h3>New to Instavibe? <Link to="/signup">Sign Up</Link></h3>
            </div>
        </>
    )
}

export default Login