import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Post from "./Post"

function User({ setIsLoggedIn, userId, setUserId }) {

    const [userData, setUserData] = useState("")
    const [otherUser, setOtherUser] = useState([])
    const [posts, setPosts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (userId) {
            fetch(`/api/user/${userId}`)
                .then(r => r.json())
                .then(data => {
                    setUserData(data)
                })
        }
        fetch('/api/posts')
            .then(r => r.json())
            .then(info => {
                setPosts(info)
            })
        fetch('/api/users')
            .then(r => r.json())
            .then(users => {
                const filteredUsers = users.filter(user => user.id !== userId)
                setOtherUser(filteredUsers)
            })
    }, [userId])

    function handleLogOut() {
        setIsLoggedIn(false)
        setUserId(0)
        fetch(`/api/login`, {
            method: "DELETE"
        })
        navigate('/login')
    }

    const post = posts?.filter((post) => {
        return (post.id == userData.id)
    })

    const postCard = post.map((post) => {
        return <Post key={post.id} post={post} username={userData.username} />
    })

    return (
        <>
            <div className="flex font-Body justify-between mb-16">
                <img className="w-24 m-6" src="/Logo.png" />
                <h1 className="font-Instagram text-3xl my-12">InstaVibe</h1>
                <input className="w-3/5 text-center m-9 my-14 border-2 rounded-lg shadow-lg hover:border-gray-400" id="search" autoComplete="off" placeholder="Search 🔎" />
                <button className="m-16 shadow-xl rounded-3xl text-white bg-lightBlue hover:bg-blue-500 w-24 text-center" onClick={() => handleLogOut()}>Logout</button>
            </div>
            <div className="flex gap-12 font-Body border-b-4 border-black">
                <img className="my-12 ml-32 rounded-full h-36 w-36 object-cover" src="/Profile.webp" />
                <div className="flex-col p-4">
                    <h2 className="my-4 text-6xl">{userData.username}</h2>
                    <h3 className="my-4 text-2xl">Posts: {post.length}</h3>
                </div>
            </div>
            {postCard}

        </>
    )
}

export default User