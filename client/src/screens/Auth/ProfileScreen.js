import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'src/components/shared';
import { getUserDetail, updateUserProfile } from 'src/actions/userActions';
import { listMyOrders } from 'src/actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from 'src/constants/userConstants';
import formatCash from 'src/utils/formatCash';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const userDetail = useSelector(state => state.userDetail);
    const { loading, error, user } = userDetail;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetail('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
                setAvatar(user.avatar);
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setAvatar(data)
            setUploading(false)
        } catch(error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, avatar, password }));
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>Thông tin</h2>
                {message && <Message variant='danger'>{message}</Message>}
                { }
                {success && <Message variant='success'>Hồ sơ cá nhân đã cập nhật</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Nhập tên'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Nhập email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='avatar'>
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Nhập image url'
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}                            
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                                {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Nhập mật khẩu'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Xác nhận mật khẩu'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Cập nhật
                        </Button>
                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>Đơn hàng của tôi</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped border hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Date</th>
                                <th>Giá</th>
                                <th>Thanh toán</th>
                                <th>Giao hàng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{formatCash(order.totalPrice)} đ</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Chi tiết
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
}

export default ProfileScreen;