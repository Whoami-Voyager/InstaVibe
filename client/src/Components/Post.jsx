import { useState } from "react"

function Post() {

    const [like, setLike] = useState(true)

    function showComments(e) {
        console.log(e)
    }

    return (
        <div>
            <img src="/Profile.webp" />
            <h2>Username</h2>
            <img src="https://imageio.forbes.com/specials-images/imageserve/6552427075f8cabe3a24d6f1/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds" />
            <p>caption</p>
            {like
                ?
                <img src="/heart.png" onClick={() => setLike(false)} />
                :
                <img src="/heartLiked.png" onClick={() => setLike(true)} />
            }
            <img src="/chat.png" onClick={(e) => showComments(e)} />
            <input placeholder="Add Comment"/>
        </div>
    )
}

export default Post
