import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Conversation({ data, currentUserId }) {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        let userId = data.members.find((id) => { id !== currentUserId })
            (async function () {
                let { data } = await axios.get(`/chat/${userId}`)
                console.log(data,'hhhhh');
            })()
    }, [])
    return (
        <div>Conversation</div>
    )
}

export default Conversation