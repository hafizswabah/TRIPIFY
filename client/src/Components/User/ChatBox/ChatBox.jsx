import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import defaultChatImg from '../../../assets/defaultChatImg.png';
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji';
import { Button } from '@mui/material';
import { Socket } from 'socket.io-client';

function ChatBox({ chat, currentUserId, setSendMeessage, recieveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setnewMessages] = useState("");
  let agentId = chat?.members.find((id) => id !== currentUserId);

  useEffect(() => {
    (async function () {
      if (chat !== null) {
        let { data } = await axios.get(`/user/get-agent/${agentId}`);
        if (!data.err) {
          setUserData(data.agentData);
        }
      }
    })();
  }, [chat, currentUserId]);

  useEffect(() => {
    (async function () {
      if (chat !== null) {
        let { data } = await axios.get(`/message/${chat._id}`);
        if (!data.err) {
          setMessages(data.message);
        }
      }
    })();
  }, [chat]);

  async function sendMessage(e) {
    e.preventDefault();
    let message = {
      senderId: currentUserId,
      text: newMessages,
      chatId: chat._id
    };

    try {
      let { data } = await axios.post("/message/", message);
      console.log(data);
      setMessages([...messages, data.result]);
      setnewMessages("");
      let recieverId = chat?.members.find((id) => id !== currentUserId);
      setSendMeessage({ ...data.result, recieverId });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (recieveMessage !== null) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  return (
    <>
      <div
        className="ChatBox-container"
        style={{
          background: "#fbfbfb",
          borderRadius: "1rem",
          display: "grid",
          gridTemplateRows: "14vh 60vh 13vh",
        }}
      >
        {chat ? (
          <>
            <div
              className="chat-header"
              style={{
                padding: "1rem 1rem 0rem 1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="chat-follower">
                <div style={{ display: "flex", gap: "13px" }}>
                  <div>
                    <img
                      src={defaultChatImg}
                      alt=""
                      className="followerImage"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "23px",
                      }}
                    />
                  
                  </div>
                  <div
                    className="chatUserDetails d-flex align-items-center"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    {userData?.[0].name}
                  </div>
                </div>
              </div>
              <hr style={{ border: "0.1px solid #cfcfcf" }} />
            </div>
            <div
              className="chat-body"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1.5rem",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              {messages?.map((message) => (
                <div
                  key={message._id}
                  className={
                    message.senderId === currentUserId ? "message own" : "message"
                  }
                  style={{
                    background:
                      message.senderId === currentUserId
                        ? "linear-gradient(98.63deg, #3f71d7 0%, #358ff9 100%)"
                        : "#ff8100",
                    color: message.senderId === currentUserId ? "white" : "white",
                    padding: "0.7rem",
                    borderRadius: message.senderId === currentUserId ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
                    maxWidth: "28rem",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignSelf: message.senderId === currentUserId ? "flex-end" : "flex-start",
                  }}
                >
                  <span>{message?.text}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--textColor)", alignSelf: "end" }}>
                    {format(message?.createdAt)}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="chat-sender"
              style={{
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                height: "3.5rem",
                alignItems: "center",
                gap: "1rem",
                padding: "0.8rem",
                borderRadius: "1rem",
                alignSelf: "end",
              }}
            >
              <div
                style={{
                  background: "rgb(233, 233, 233)",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                +
              </div>
              <InputEmoji
                value={newMessages}
                onChange={(newMessages) => { setnewMessages(newMessages) }}
                style={{
                  height: "70%",
                  backgroundColor: "rgb(236, 236, 236)",
                  borderRadius: "0.5rem",
                  border: "none",
                  outline: "none",
                  flex: "1",
                  fontSize: "14px",
                  padding: "0px 15px 0px 15px",
                }}
              />
              <Button onClick={sendMessage} disabled={!newMessages.trim()}>send</Button>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start a conversation
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
