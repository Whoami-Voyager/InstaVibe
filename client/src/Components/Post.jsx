import { useState, useEffect } from "react";

function Post({ post, username, userId }) {
    const [like, setLike] = useState(false);
    const [comment, showComment] = useState(true);
    const [interaction, setInteraction] = useState([]);
    const [commentText, setCommentText] = useState("")

    const number = interaction.length - 1;

    useEffect(() => {
        fetch(`/api/post/${post.id}`)
            .then(r => r.json())
            .then(data => {
                setInteraction(data['interactions']);
                const index = data['interactions'].length - 1
                const currentLike = data['interactions'][index]?.like;
                setLike(currentLike);
            })
            .catch(error => console.error('Error fetching interactions:', error));
    }, [post.id]);

    function showComments(e) {
        e.preventDefault();
        showComment((prevcom) => !prevcom);
    }

    function updateLike() {
        setLike((prevLike) => !prevLike);
        const interactionId = interaction[number]?.id;
        fetch(`/api/interactions/${interactionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    like: !like,
                    user_id: userId,
                    post_id: post.id
                }
            )
        })
    }

    function addComment(e) {
        e.preventDefault()
        fetch('/api/interactions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    comment: commentText,
                    like: like,
                    user_id: userId,
                    post_id: post.id,
                }
            )
        })
            .then(r => r.json())
            .then(newComment => {
                setInteraction(prevInteraction => [...prevInteraction, newComment]);
                setCommentText("");
            })
            .catch(error => console.error('Error adding comment:', error));
    }

    const comments = interaction.map(comment => {
        return <p key={comment.id} className="pb-2">{comment.user.username}: {comment.comment}</p>
    });

    return (
        <div className="mx-48 my-24 border-4 rounded-md font-Body">
            <div>
                <div className="flex flex-row">
                    <img className="rounded-full m-6 h-24 w-24 object-cover" src="/Profile.webp" />
                    <h2 className="m-8 text-4xl">{username}</h2>
                </div>
                <img src={post.image_url} />
                <div className="flex flex-row">
                    {like
                        ? <img className="w-12 m-3" src="/heartLiked.png" onClick={() => updateLike()} />
                        : <img className="w-12 m-3" src="/heart.png" onClick={() => updateLike()} />
                    }
                    <img className="w-12 m-3" src="/chat.png" onClick={(e) => showComments(e)} />
                </div>
                <p className="m-4 text-2xl">{post.caption}</p>
                {comment
                    ? <></>
                    : <div className="m-4">{comments}</div>
                }
                <form onSubmit={(e) => addComment(e)}>
                    <input className="border-2 rounded-lg text-center m-3 shadow-md mb-6 resize-y" id="comment" placeholder="Add Comment" onChange={(e) => setCommentText(e.target.value)} />
                </form>
            </div>
        </div>
    );
}

export default Post;
