import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message, FormContainer } from 'src/components/shared';
import { login } from 'src/actions/userActions';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <FormContainer>
            <h1>Đăng nhập</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Nhập email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Mật Khẩu</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Nhập mật khẩu'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='py-3' variant='primary'>
                    Đăng nhập
                </Button>

                <Row className='py-3'>
                    <Col>
                        Khách hàng mới ? {' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Đăng ký
                        </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
}

export default LoginScreen;