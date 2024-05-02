import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Singup({ setIsLoggedIn, setUserId }) {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [incorrectPassword, setIncorrectPassword] = useState(true)

    function createdNewUser(e) {
        e.preventDefault()
        if (userPassword === checkPassword) {
            fetch('/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        username: userName,
                        email: userEmail,
                        password: userPassword
                    }
                )
            })
                .then(r => {
                    if (r.ok) {
                        const userId = r.id
                        setUserId = userId
                        setUserName("")
                        setUserEmail("")
                        setUserPassword("")
                        setCheckPassword("")
                        navigate(`/user/${userId}`)
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
        else {
            setIncorrectPassword(false)
        }
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
                    {incorrectPassword
                        ?
                        <>
                            <h3>Password:</h3>
                            <input id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                            <h3>Verify Password:</h3>
                            <input id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                            <button type="submit">Sign Up</button>
                        </>
                        :
                        <>
                            <h3>Password:</h3>
                            <input id="password" type="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                            <h4>Passwords are not the same. Please re-enter password</h4>
                            <h3>Verify Password:</h3>
                            <input id="verifyPassword" type="password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                            <h4>Passwords are not the same. Please re-enter password</h4>
                            <button type="submit">Sign Up</button>
                        </>
                    }
                </form>
            </div>
        </>
    )
}

export default Singup