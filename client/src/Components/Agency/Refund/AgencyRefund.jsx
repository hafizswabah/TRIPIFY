import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Dropdown, Row, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AgencyHeader from '../Header/AgencyHeader'
import AgencySidebar from '../SideBar/AgencySidebar'
import noDataImg from '../../../../src/assets/NoData.jpg'
import AdminHeader from '../../Admin/Header/AdminHeader'
import AdminSidebar from '../../Admin/SideBar/AdminSideBar'
function AgencyRefund() {
    const [clicked, setCLicked] = useState(false)
    const [RefundList, setRefundList] = useState([])


    const handleClick = () => {
        setCLicked(!clicked)
    }
    useEffect(() => {
        (
            async function () {
                const { data } = await axios.get("/agency/refund");
                if (!data.err) {
                    setRefundList(data.refundList)

                }
            }
        )()
    }, [])
    async function issueRefund(id) {
        Swal.fire({
            title: 'Are you sure? Issue refund',
            text: "Issue Refund!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#7e3af2',
            cancelButtonColor: '##a8a8a8',
            confirmButtonText: 'Yes, Refund!',
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axios.post("/agency/booking/refund/complete", { id })
                if (data.err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.message,
                    })
                }
                if (!data.err) {
                    Swal.fire(
                        'Success!',
                        'Successfully Issued refund',
                        'success'
                    )
                    setRefresh(!refresh)
                }
            }
        })
    }

    return (
        <div>
            <AdminHeader handleClick={handleClick} />
            <Row className='m-0'>
            <Col md={3} style={{padding:"0px"}}>
                    <AdminSidebar page={'refund'} clicked={clicked} />
                </Col>
                <Col md={8}>
                    <div className="admin-container">
                        <h5 className='p-4' style={{ fontSize: '22px', fontWeight: 300 }}>
                            Refund Details</h5>
                        {
                            RefundList[0] ?
                                <Table className='table-main' responsive size="sm" style={{ fontSize: ".8rem" }}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Booking Id</th>
                                            <th>Payment Id</th>
                                            <th>Order Id</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Option</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            RefundList.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item._id}</td>
                                                    <td>{item.payment.razorpay_payment_id}</td>
                                                    <td>{item.payment.razorpay_order_id}</td>
                                                    <td>{item.totalCost}/-</td>
                                                    <td>{item.status}</td>
                                                    <td>
                                                        <button className='btn btn-outline-dark btn-sm' onClick={() => issueRefund(item._id)}>Issue Refund</button>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </Table>
                                :
                                <Row className='d-flex justify-content-center flex-column align-items-center'>
                                    <img src={noDataImg}
                                        style={{ maxHeight: "300px", maxWidth: "90%", width: "300px" }} alt="" />
                                    <h6 className='text-center'>No data found</h6>
                                </Row>
                        }
                    </div>
                </Col>

            </Row>

        </div >
    )
}

export default AgencyRefund