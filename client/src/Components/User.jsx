import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

function User({ setIsLoggedIn }) {

    const detailParam = useParams()
    const detailId = detailParam.id

    return (
        <>
            <div>
                <Link to="/login" onClick={(e) => console.log(e)}>Logout</Link>
            </div>
        </>
    )
}

export default User