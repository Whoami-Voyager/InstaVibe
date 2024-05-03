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
            <div className="flex justify-between mb-36 border-b-2">
                <img className="w-24 m-6" src="/Logo.png" />
                <h1 className="text-3xl my-12">InstaVibe</h1>
                <input className="w-3/5 text-center m-9 my-14 border-2 rounded-lg shadow-lg hover:border-gray-400" id="search" autoComplete="off" placeholder="Search 🔎" />
                <Link className="m-16" to="/login" onClick={(e) => handleLogOut(e)}>Logout</Link>
            </div>
            <div className="flex gap-12 border-b-4">
                <img className="m-8 ml-32 rounded-full h-36 w-36 object-cover" src="/Profile.webp" />
                <div className="flex-col p-4">
                    <h2 className="m-4 text-3xl">Username</h2>
                    <h3 className="m-4 text-xl">Amount of posts</h3>
                </div>
            </div>
            {/* {posts} */}
            <Post />
        </>
    )
}

export default User