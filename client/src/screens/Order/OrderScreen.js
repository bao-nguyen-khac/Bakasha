import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader } from 'src/components/shared'
import {
    getOrderDetail,
    payOrder,
    deliverOrder,
} from 'src/actions/orderActions'
import * as types from 'src/constants/orderConstants'
import * as moment from 'moment'
import formatCash from 'src/utils/formatCash'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetail = useSelector((state) => state.orderDetail)
    const { order, loading, error } = orderDetail

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(`/api/config/paypal`)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }


        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: types.ORDER_PAY_RESET })
            dispatch({ type: types.ORDER_DELIVER_RESET })
            dispatch(getOrderDetail(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, successDeliver, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Đơn hàng</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Tên: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Địa chỉ: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Đã giao hàng vào {moment(order.deliveredAt).format('hh:mm a,DD/MM/YYYY')}
                                </Message>
                            ) : (
                                <Message variant='danger'>Chưa giao hàng</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Phương thức thanh toán</h2>
                            <p>
                                <strong>Phương thức: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Đã thanh toán vào {moment(order.paidAt).format('hh:mm a, DD/MM/YYYY')}</Message>
                            ) : (
                                <Message variant='danger'>Chưa thanh toán</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Sản phẩm</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Đơn hàng trống</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/book/${item.book}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x {formatCash(item.price)} đ = {formatCash(item.quantity * item.price)} đ
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tổng đơn hàng</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Sản phẩm</Col>
                                    <Col>{formatCash(order.itemsPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{formatCash(order.shippingPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế</Col>
                                    <Col>{formatCash(order.taxPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng</Col>
                                    <Col>{formatCash(order.totalPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Đã giao
                                        </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen