import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Conversation from '../Conversation/Conversation'
import NavBar from '../NavBar/NavBar'
import './UserChat.css'

function UserChat() {
    const [chats, setChats] = useState([])
    let {user}=useSelector((state)=>{
        return state
    })
    let userId=user.details._id

    useEffect(() => {
        (async function(){
            let {data}=await axios.get(`/chat/${userId}`)
            console.log(data);
            if(!data.err){
                setChats(data.UserChats)
            }
        })()
    }, [])
    return (
        <div>
            <NavBar />
            <div className="Chat">
                <div className="Left-side-chat">
                    <div className="Chat-container">
                        <h2>chats</h2>
                        <div className="Chat-list">
               {chats?.map((chat)=>(
                <div>
                    <Conversation data={chat} currentUserId={userId}></Conversation>
                </div>
               ))}
                        </div>
                    </div>

                </div>

                <div className="Right-side-chat">

                </div>
            </div>

        </div>
    )
}

export default UserChat