import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import defaultChatImg from '../../../assets/defaultChatImg.jpg'
import './chatbox.css'
import {format} from "timeago.js"

function ChatBox({ chat, currentUserId }) {
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
console.log(currentUserId);
  let userId = chat?.members.find((id) => id !== currentUserId)
  useEffect(() => {
    (async function () {
      if (chat !== null) {
        let { data } = await axios.get(`/user/get-user/${userId}`)
        if (!data.err) {
          setUserData(data.userData)
        }
      }

    })()
  }, [chat, currentUserId])
  useEffect(() => {
    (async function () {
      if (chat !== null) {
        let { data } = await axios.get(`/message/${chat._id}`)
        if (!data.err) {
          setMessages(data.message)
        }
      }

    })()
  }, [chat])
  console.log(messages);
  return (
    <>
      <div className="ChatBox-container">
        <>
          <div className="chat-header">
            <div className="chat-follower">
              <Row>
                <Col md={4}>
                  <div>

                    <img src={defaultChatImg} alt="" className='followerImage' style={{ width: "50px", height: "50px", borderRadius: "23px" }} />
                    <div className="name" style={{ fontSize: "0.6rem" }}>

                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <div className="chatUserDetails d-flex align-items-center">
                    <span>{userData?.[0].name}</span>
                  </div>
                </Col>
              </Row>
            </div>
          <hr style={{ border: "0.1px solid #cfcfcf" }} />
          </div>
          <div className="chat-body">
            {messages?.map((message) => (
              <>
                <div className={message.senderId === currentUserId ? "message own" : "message"}>
                  <span>{message?.text}</span>
                  <span>{format(message?.createdAt)}</span>
                </div>
              </>
            )
            )}
          </div>
        </>
      </div>
    </>
  )
}

export default ChatBox