import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form, Breadcrumb, Tabs, Tab } from 'react-bootstrap';
import { Loader, Message, Meta } from 'src/components/shared';
import { Rating, ReleaseBooks } from 'src/components/book';
import {
    detailBook,
    createBookReview,
} from 'src/actions/bookActions';
import { BOOK_CREATE_REVIEW_RESET } from 'src/constants/bookConstants';
import addToCart from 'src/assets/animations/addToCart.gif';
import starsRating from 'src/assets/animations/starsRating.gif';
import writeReview from 'src/assets/animations/writeReview.gif';
import "src/assets/styles/book.css";
import formatCash from 'src/utils/formatCash';

const BookDetailScreen = ({ history, match }) => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const bookDetail = useSelector(state => state.bookDetail);
    const { loading, error, book } = bookDetail;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const bookReviewCreate = useSelector(state => state.bookReviewCreate);
    const {
        success: successBookReview,
        loading: loadingBookReview,
        error: errorBookReview,
    } = bookReviewCreate;

    useEffect(() => {
        if (successBookReview) {
            setRating(0);
            setComment('');
        }
        if (!book._id || book._id !== match.params.id) {
            dispatch(detailBook(match.params.id));
            dispatch({ type: BOOK_CREATE_REVIEW_RESET });
        }
    }, [dispatch, match, successBookReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createBookReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/book'>
                <i className="fas fa-angle-left"></i> Trở về
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={book.name} />
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                        <Breadcrumb.Item href="/book">
                            Sách
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{book.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col md={4}>
                            <Image className="book-detail-img" src={book.image} alt={book.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3><strong>{book.name}</strong></h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={book.rating}
                                        text={`${book.numReviews} đánh giá`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Giá: {book.sales > 0 ? (
                                        <>
                                            <strike>
                                                {(book.price)} đ
                                            </strike>

                                            <strong> {(book.sales)} đ </strong>
                                        </>
                                    ) : (
                                        <strong> {(book.price)} đ</strong>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Tác giả: {book.author}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Trạng thái:</Col>
                                            <Col>
                                                {book.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {book.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Số lượng</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={quantity}
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                    >
                                                        {[...Array(book.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={book.countInStock === 0}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                        <Image src={addToCart} fluid/>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Tabs className="mt-3" defaultActiveKey="description" transition={false} id="noanim-tab-example">
                        <Tab eventKey="description" title="Description">
                            <p className="tab-description"><i>{book.description}</i></p>
                        </Tab>
                        <Tab eventKey="detail" title="Detail">
                            <ListGroup>
                                <ListGroup.Item>
                                    <strong>Thể loại</strong>: {book.genres}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Số trang</strong>: {book.pages}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Xuất bản vào</strong>: {book.publishedAt}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Nhà xuất bản</strong>: {book.publisher}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Ngôn ngữ</strong>: {book.language}
                                </ListGroup.Item>
                            </ListGroup>
                        </Tab>
                        <Tab eventKey="review" title="Review">
                            <Row>
                                <Col md={6}>
                                    {book.reviews.length === 0 &&
                                        <Message>
                                            Không có đánh giá
                                            <Image src={writeReview} fluid />
                                        </Message>
                                    }
                                    <ListGroup variant='flush'>
                                        {book.reviews.map((review) => (
                                            <ListGroup.Item key={review._id}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={review.avatar} width="50" height="50" roundedCircle />
                                                    </Col>
                                                    <Col md={10}>
                                                        <strong>{review.name}</strong>
                                                        <p>{review.createdAt.substring(0, 10)}</p>
                                                        <p>{review.comment}</p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                                <Col md={6}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2>Viết đánh giá</h2>
                                            <Image src={starsRating} fluid />
                                            {successBookReview && (
                                                <Message variant='success'>
                                                    Bài đánh giá đã được gửi thành công
                                                </Message>
                                            )}
                                            {loadingBookReview && <Loader />}
                                            {errorBookReview && (
                                                <Message variant='danger'>{errorBookReview}</Message>
                                            )}
                                            {userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                        <Form.Label>Sao</Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                        >
                                                            <option value=''>Chọn...</option>
                                                            <option value='1'>1 - Rất tệ</option>
                                                            <option value='2'>2 - Tệ</option>
                                                            <option value='3'>3 - Tốt</option>
                                                            <option value='4'>4 - Rất tốt</option>
                                                            <option value='5'>5 - Xuất sắc</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Đánh giá</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='3'
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingBookReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Đăng
                                                    </Button>
                                                </Form>
                                            ) : (
                                                <Message>
                                                    Vui lòng <Link to='/login'>đăng nhập</Link> để viết đánh giá{' '}
                                                </Message>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                    <div className="my-5">
                        <h4><strong>Mới ra mắt</strong></h4>
                        <ReleaseBooks />
                    </div>
                </>
            )}
        </>
    );
}

export default BookDetailScreen;