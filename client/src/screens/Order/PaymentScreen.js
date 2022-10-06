import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CheckoutSteps } from 'src/components/order'
import { FormContainer } from 'src/components/shared'
import { savePaymentMethod } from 'src/actions/cartActions'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/place_order')
    }

    return (
        <>
            <FormContainer>
                {/* <CheckoutSteps step1 step2 step3 /> */}
                <h1>Phương thức thanh toán</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Phương thức</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal hoặc Credit Card'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>

                        </Col>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Tiếp tục
                </Button>
                </Form>
            </FormContainer>

        </>
    )
}

export default PaymentScreen