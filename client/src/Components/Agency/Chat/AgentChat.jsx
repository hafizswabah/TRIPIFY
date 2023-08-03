import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client"
import AgencyHeader from '../Header/AgencyHeader'
import Conversation from '../AgentConversation/AgentConversation'
import ChatBox from '../AgentChatBox/AgentChatBox'
import "../../User/chat/UserChat.css"

function AgentChat() {
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [sendMessage, setSendMeessage] = useState(null)
    const [recieveMessage, setRecieveMeessage] = useState({})
    console.log(sendMessage, "sendMessage");
 
    let { agency } = useSelector((state) => {
        return state
    })
    let agentId = agency.details._id

    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/chat/${agentId}`)
            console.log(data);
            if (!data.err) {
                setChats(data.userChats)
            }
        })()
    }, [agentId])

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_SERVER_URL);
        socket.current.emit("new-user-add", agentId);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [agentId]);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
      
        socket.current.on("recieve-message", (data) => {
            console.log(data,'recivedata');
            setRecieveMeessage(data);
        });
    }, []);

    console.log(recieveMessage, "recieveMessage");
    return (
        <div>
    <AgencyHeader/>
            <div className="Chat">
                <div className="Left-side-chat">
                    <div className="Chat-container">
                        <h4>chats</h4>
                        <div className="Chat-list">
                            {chats?.map((chat) => (

                                <div onClick={() => { setcurrentChat(chat) }}>
                                    <Conversation data={chat} agentId={agentId}></Conversation>
                                </div>
                            )
                            )}
                        </div>
                    </div>

                </div>

                <div className="Right-side-chat">
                    <ChatBox chat={currentChat} agentId={agentId} setSendMeessage={setSendMeessage} recieveMessage={recieveMessage} ></ChatBox>
                </div>
            </div>

        </div>
    )
}

export default AgentChat