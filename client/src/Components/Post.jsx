import { useState } from "react"

function Post() {

    const [like, setLike] = useState(true)

    function showComments(e) {
        console.log(e)
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="flex flex-row">
                    <img className="rounded-full m-6 h-24 w-24 object-cover" src="/Profile.webp" />
                    <h2 className="m-8">Username</h2>
                </div>
                <img className="w-3/4" src="https://imageio.forbes.com/specials-images/imageserve/6552427075f8cabe3a24d6f1/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" />
                <p>caption</p>
                <div className="flex flex-row">
                    {like
                        ?
                        <img className="w-12 m-3" src="/heart.png" onClick={() => setLike(false)} />
                        :
                        <img className="w-12 m-3" src="/heartLiked.png" onClick={() => setLike(true)} />
                    }
                    <img className="w-12 m-3" src="/chat.png" onClick={(e) => showComments(e)} />
                </div>
                <input id="comment" placeholder="Add Comment" />
            </div>
        </div>
    )    
}

export default Post
