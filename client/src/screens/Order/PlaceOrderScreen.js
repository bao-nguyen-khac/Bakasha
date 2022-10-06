import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { ORDER_CREATE_RESET } from 'src/constants/orderConstants'
import { USER_DETAILS_RESET } from 'src/constants/userConstants'
import { createOrder } from 'src/actions/orderActions'
import { CheckoutSteps } from 'src/components/order'
import { Message } from 'src/components/shared'
import formatCash from 'src/utils/formatCash'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    if (!cart.shippingAddress.address) {
        history.push('/shipping')
    } else if (!cart.paymentMethod) {
        history.push('/payment')
    }

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100000 ? 10000 : 5000)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    )

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
        <>
            {/* <CheckoutSteps step1 step2 step3 step4 /> */}
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Địa chỉ: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Phương thức thanh toán</h2>
                            <strong>Phương thức: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Sản phẩm</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Giỏ hàng trống</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
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
                                                    <Link to={`/product/${item.product}`}>
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
                                    <Col>{formatCash(cart.itemsPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{formatCash(cart.shippingPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế</Col>
                                    <Col>{formatCash(cart.taxPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng</Col>
                                    <Col>{formatCash(cart.totalPrice)} đ</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Đặt hàng
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen