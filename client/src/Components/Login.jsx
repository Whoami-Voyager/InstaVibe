import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login({ setIsLoggedIn, setUserId }) {

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
                    return r.json()
                }
                else {
                    alert("Not Valid Login")
                    return undefined
                }
            })
            .then(data => {
                if (data === undefined) {
                    alert("Something went wrong. Please try again.")
                }
                else {
                    const userId = data.id
                    setUserId(userId)
                    setLoginPassword("")
                    setLoginUser("")
                    navigate(`/user/${userId}`)
                    setIsLoggedIn(true)
                }
            })
            .catch(error => {
                alert("Something went wrong. Please try again.")
                console.error('Login failed:', error)
            })
    }

    return (
        <>
            <div className="flex mb-24 border-b-2">
                <img className="w-12 m-6" src="/Logo.png" />
                <h1 className="text-3xl my-5">InstaVibe</h1>
            </div>
            <div className="border-2 flex-col rounded-3xl bg-white bg-opacity-25 backdrop-blur-lg shadow-lg p-6">
                <h2 className="text-center text-4xl m-8">Welcome to InstaVibe!</h2>
                <form className="flex items-center flex-col" onSubmit={(e) => logIn(e)}>
                    <div>
                        <h3 className="text-center text-xl text-primaryPurple">Username:</h3>
                        <input id="username" className="inputs" autoComplete="username" onChange={(e) => setLoginUser(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="text-center text-xl text-primaryPurple">Password:</h3>
                        <input id="password" className="inputs" autoComplete="current-password" type="password" onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <button className="bg-lightBlue hover:bg-blue-500 shadow-xl text-white font-bold py-2 px-4 m-6 rounded" type="submit">Log In</button>
                </form>
                <h3 className="text-center m-5">New to Instavibe? <Link className="text-primaryBlue border-b-2 border-primaryBlue hover:border-primaryPurple hover:text-primaryPurple" to="/signup">Sign Up</Link></h3>
            </div>
        </>
    )
}

export default Login