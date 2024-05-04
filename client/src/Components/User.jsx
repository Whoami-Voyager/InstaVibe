import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Post from "./Post"

function User({ setIsLoggedIn, userId }) {

    const [userData, setUserData] = useState(undefined)
    const [posts, setPosts] = useState(undefined)

    useEffect(() => {
        fetch(`/api/user/${userId}`)
            .then(r => r.json())
            .then(data => {
                setUserData(data)
            })
        fetch('/api/posts')
            .then(r => r.json())
            .then(info => {
                setPosts(info)
                console.log(info)
            })
    }, [])

    // const currentUsr = userData.filter(user => user.id === userId)

    function handleLogOut() {
        setIsLoggedIn(false)
        fetch(`/api/login`, {
            method: "DELETE"
        })
    }

    // const postCard = posts.map((post) => {
    //     <Post key={post.id} post={post}/>
    // })

    return (
        <>
            <div className="flex justify-between mb-36 border-b-2">
                <img className="w-24 m-6" src="/Logo.png" />
                <h1 className="text-3xl my-12">InstaVibe</h1>
                <input className="w-3/5 text-center m-9 my-14 border-2 rounded-lg shadow-lg hover:border-gray-400" id="search" autoComplete="off" placeholder="Search 🔎" />
                <Link className="m-16" to="/login" onClick={() => handleLogOut()}>Logout</Link>
            </div>
            <div className="flex gap-12 border-b-4">
                <img className="m-8 ml-32 rounded-full h-36 w-36 object-cover" src="/Profile.webp" />
                <div className="flex-col p-4">
                    <h2 className="m-4 text-3xl">Username</h2>
                    <h3 className="m-4 text-xl">Amount of posts</h3>
                </div>
            </div>
            {/* {postCard} */}
            <Post />
        </>
    )
}

export default User