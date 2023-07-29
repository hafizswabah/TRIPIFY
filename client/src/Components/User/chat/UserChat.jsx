import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatBox from '../ChatBox/ChatBox'
import Conversation from '../Conversation/Conversation'
import NavBar from '../NavBar/NavBar'
import './UserChat.css'
import { io } from "socket.io-client"

function UserChat() {
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setcurrentChat] = useState(null)

    let { user } = useSelector((state) => {
        return state
    })
    let userId = user.details._id

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_SERVER_URL);
        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      }, []);

    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/chat/${userId}`)
            console.log(data);
            if (!data.err) {
                setChats(data.userChats)
            }
        })()
    }, [])
    return (
        <div>
            <NavBar />
            <div className="Chat">
                <div className="Left-side-chat">
                    <div className="Chat-container">
                        <h4>chats</h4>
                        <div className="Chat-list">
                            {chats?.map((chat) => (

                                <div onClick={() => { setcurrentChat(chat) }}>
                                    <Conversation data={chat} currentUserId={userId}></Conversation>
                                </div>
                            )
                            )}
                        </div>
                    </div>

                </div>

                <div className="Right-side-chat">
                    <ChatBox chat={currentChat} currentUserId={userId}></ChatBox>
                </div>
            </div>

        </div>
    )
}

export default UserChat