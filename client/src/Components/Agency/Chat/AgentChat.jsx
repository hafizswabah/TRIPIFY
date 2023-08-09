import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { io } from "socket.io-client"
import AgencyHeader from '../Header/AgencyHeader'
import Conversation from '../AgentConversation/AgentConversation'
import ChatBox from '../AgentChatBox/AgentChatBox'
import "../../User/chat/UserChat.css"
import { Link, useParams, useSearchParams } from 'react-router-dom'
function AgentChat() {
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [sendMessage, setSendMeessage] = useState(null)
    const [recieveMessage, setRecieveMeessage] = useState({})
    let { agency } = useSelector((state) => {
        return state
    })
    let agentId = agency.details._id
    let [searchParams] = useSearchParams()
    const chatId= searchParams.get("id")
    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/chat/${agentId}`)
            console.log(data);
            if (!data.err) {
                setChats(data.userChats)
            }
        })()
    }, [agentId])

        useEffect(()=>{
        if(chatId){
            const chatData= chats.find((item)=>item._id===chatId)
            if(chatData){
                setcurrentChat(chatData)
            }
        }else{
            setcurrentChat(null)
        }
    },[chatId, chats])

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
            console.log(data, 'recivedata');
            setRecieveMeessage(data);
        });
    }, []);

    console.log(recieveMessage, "recieveMessage");
    return (
        <div>
            <AgencyHeader />
            <div
                className="Chat"
                style={{
                    position: 'relative',
                    display: 'grid',

                }}
            >
                {!currentChat &&
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
                                {chats && chats.length > 0 ? (
                                    chats.map((chat) => (
                                        <Link to={"/chat?id=" + chat._id} key={chat.id}>
                                            <Conversation data={chat} agentId={agentId}
                                                style={{
                                                    borderRadius: '0.5rem',
                                                    padding: '10px',
                                                    position: 'relative'
                                                }}
                                            />
                                        </Link>
                                    ))
                                ) : (
                                    "No Chat found"
                                )}

                            </div>
                        </div>

                    </div>
                }
                {currentChat && (
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
                )}

            </div>

        </div>
    )
}

export default AgentChat