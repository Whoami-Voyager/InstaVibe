import { useState } from "react";

function Post({ post, username }) {
    const [like, setLike] = useState(true);

    function showComments(e) {
        console.log(e);
    }

    function updateLike(e) {
        setLike((prevLike) => !prevLike)
        console.log(e)
    }

    return (
        <div className="mx-48 my-24 border-4 rounded-md font-Body">
            <div>
                <div className="flex flex-row">
                    <img className="rounded-full m-6 h-24 w-24 object-cover" src="/Profile.webp" />
                    <h2 className="m-8 text-4xl">{username}</h2>
                </div>
                <img className="" src={post.image_url} />
                <div className="flex flex-row">
                    {like
                        ? <img className="w-12 m-3" src="/heart.png" onClick={(e) => updateLike(e)} />
                        : <img className="w-12 m-3" src="/heartLiked.png" onClick={(e) => updateLike(e)} />
                    }
                    <img className="w-12 m-3" src="/chat.png" onClick={(e) => showComments(e)} />
                </div>
                <p className="m-4 text-2xl">{post.caption}</p>
                <input className="border-2 rounded-lg text-center m-3 shadow-md mb-6" id="comment" placeholder="Add Comment" />
            </div>
        </div>
    );
}

export default Post;
