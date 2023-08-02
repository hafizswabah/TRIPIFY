import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import defaultChatImg from '../../../assets/defaultChatImg.png' 
function Conversation({ data, currentUserId }) {
    const [userData, setUserData] = useState(null)
    let agentId = data?.members.find((id) => id !== currentUserId)
    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/user/get-agent/${agentId}`)
            if (!data.err) {
                setUserData(data.agentData)
            }
        })()
    }, [])
    return (
        <>
            <div className="follower conversation">
                <Row>
                    <div className='each-conversation' style={{display:"flex",gap:"13px"}}>
                        <div>

                            <img src={defaultChatImg} alt="" className='followerImage' style={{ width: "50px", height: "50px", borderRadius: "23px" }} />
                            <div className="name" style={{ fontSize: "8px",fontWeight:"500" }}>
                            </div>
                        </div>


                        <div className="chatUserDetails d-flex align-items-center">
                            <span style={{ fontSize: "15px",fontWeight:"500" }} >{userData?.[0].name}</span>
                        </div>
                    </div>
                </Row>



            </div>
            <hr style={{ border: "0.1px solid #cfcfcf" }} />
        </>
    )
}

export default Conversation