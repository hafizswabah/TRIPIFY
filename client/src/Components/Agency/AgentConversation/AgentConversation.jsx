import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import defaultChatImg from '../../../assets/defaultChatImg.jpg'
function Conversation({ data, agentId }) {
    const [userData, setUserData] = useState(null)
    let userId = data?.members.find((id) => id !== agentId)
    useEffect(() => {
        (async function () {
            let { data } = await axios.get(`/user/get-user/${userId}`)
            if (!data.err) {
                setUserData(data.userData)
            }
        })()
    }, [])
    return (
        <>
            <div className="follower conversation">
                <Row>
                    <Col md={4}>
                        <div>
                            <div className="online-dot"></div>
                            <img src={defaultChatImg} alt="" className='followerImage' style={{ width: "50px", height: "50px", borderRadius: "23px" }} />
                            <div className="name" style={{ fontSize: "0.6rem" }}>
                                <span>online</span>
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
        </>
    )
}

export default Conversation