import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Post from "./Post"

function User({ setIsLoggedIn }) {

    const [userData, setUserData] = useState(undefined)

    const detailParam = useParams()
    const detailId = detailParam.id

    useEffect(() => {
        fetch('/api/users')
            .then(r => r.json())
            .then(data => {
                setUserData(data)
            })
    }, [])

    // const currentUsr = userData.filter(user => user.id === parseInt(detailId))

    function handleLogOut(e) {
        console.log(e)
        setIsLoggedIn(false)
        fetch(`/user/${detailId}`, {
            method: "DELETE"
        })
    }

    // const posts = userData.map((post) => {
    //     <Post key={post.id} post={post}/>
    // })

    return (
        <>
            <div>
                <img src="/Logo.png" />
                <h1>InstaVibe</h1>
                <input className="search" id="Search" autoComplete="off" placeholder="Search 🔎" />
                <Link to="/login" onClick={(e) => handleLogOut(e)}>Logout</Link>
            </div>
            <div>
                <img src="/Profile.webp" />
                <h2>Username</h2>
                <h3>Amount of posts</h3>
            </div>
            {/* {posts} */}
            <Post />
        </>
    )
}

export default User