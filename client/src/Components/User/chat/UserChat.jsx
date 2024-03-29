import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatBox from '../ChatBox/ChatBox'
import Conversation from '../Conversation/Conversation'
import NavBar from '../NavBar/NavBar'
import './UserChat.css'
import { io } from "socket.io-client"
import { Link, useParams, useSearchParams } from 'react-router-dom'

function Chat() {
    const socket = useRef()
    const [chats, setChats] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [sendMessage, setSendMeessage] = useState(null)
    const [recieveMessage, setRecieveMeessage] = useState({})
    let { user } = useSelector((state) => {
        return state
    })
    let userId = user.details._id
    let [searchParams] = useSearchParams()
    const chatId= searchParams.get("id")
  


    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/chat/${userId}`)
            if (!data.err) {
                setChats(data.userChats)
            }
            

        })()
    }, [userId])
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
        socket.current.emit("new-user-add", userId);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
            console.log(users,"online");
        });
    }, [userId]);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {

        socket.current.on("recieve-message", (data) => {
            console.log(data, 'recive-dataaa');
            setRecieveMeessage(data);
        });
    }, []);



    return (
        <div>
            <NavBar />
            <div
                className="Chat"
                style={{
                    position: 'relative',
                    display: 'grid',
               
                }}
            >
                {
                    !currentChat &&
                <div
                    className="Left-side-chat"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'

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
                                    <Link to={"/chat?id="+chat._id} key={chat.id } 
                                    style={{textDecoration:"none"}}>
                                        <Conversation data={chat} currentUserId={userId} 
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
                    <div
                        className="Right-side-chat"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            background: '#f3f3f3',
                            borderRadius: '1rem',
                            margin: '0.8rem',
                        }}
                    >
                        <ChatBox
                            chat={currentChat}
                            currentUserId={userId}
                            setSendMeessage={setSendMeessage}
                            recieveMessage={recieveMessage}
                        />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Chat