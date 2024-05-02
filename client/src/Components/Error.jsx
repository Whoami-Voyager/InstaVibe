import { Link } from "react-router-dom"

function Error() {
    return (
        <>
            <div>
                <Link to="/">Back to Login</Link>
            </div>
            <h1>Oops, looks like you got to the error page. Anyway, here's a cool video:</h1>
            <iframe
                width="966"
                height="543"
                className="mx-auto"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </>
    )
}

export default Error