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
 console.log(onlineUsers,'online-users');
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
    <div
                className="Chat"
                style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '16% auto',
                }}
            >
                  <div
                    className="Left-side-chat"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                   <div
                        className="Chat-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            background: '#fbfbfb',
                            borderRadius: '1rem',
                            padding: '1rem',
                            height: 'auto',
                            minHeight: '88vh',
                            overflow: 'hidden',
                            margin: '0.8rem',
                        }}
                    >
                        <h4>chats</h4>
                        <div
                            className="Chat-list"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            {chats?.map((chat) => (

                                <div onClick={() => { setcurrentChat(chat) }}>
                                    <Conversation data={chat} agentId={agentId}
                                        style={{
                                            borderRadius: '0.5rem',
                                            padding: '10px',
                                            position: 'relative' 
                                          }}
                                    ></Conversation>
                                </div>
                            )
                            )}
                        </div>
                    </div>

                </div>

                <div className="Right-side-chat"
                     style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        background: '#f3f3f3',
                        borderRadius: '1rem',
                        margin: '0.8rem',
                    }}
                >
                    <ChatBox chat={currentChat} agentId={agentId} setSendMeessage={setSendMeessage} recieveMessage={recieveMessage} ></ChatBox>
                </div>
            </div>

        </div>
    )
}

export default AgentChat