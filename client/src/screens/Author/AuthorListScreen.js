import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Breadcrumb, Jumbotron } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { listAuthors } from 'src/actions/authorActions';
import "src/assets/styles/author.css";

const AuthorListScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();
    const authorList = useSelector(state => state.authorList);
    const { loading, error, authors, page, pages } = authorList;

    useEffect(() => {
        dispatch(listAuthors(keyword, pageNumber));

    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/author" active>
                    Tác giả
                </Breadcrumb.Item>
            </Breadcrumb>
            <Jumbotron className="text-center bg-author-image">
                <Row>
                    <Col className="p-5 text-light">
                        <h1>Tác giả văn học nổi tiếng</h1>
                        <p>Chào mừng bạn đến với hiệu sách của chúng tôi</p>
                    </Col>
                </Row>
            </Jumbotron>
            <h1 className="mt-2">Danh sách tác giả</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {authors.map((author) => (
                        <Col key={author._id} sm={12} md={6} lg={4} className="text-center">
                            <div className="p-3">
                                <Link to={`/author/${author._id}`}>
                                    <Image className="author" src={author.portrait} width="200" height="240" roundedCircle />
                                </Link>
                                <Link to={`/author/${author._id}`}>
                                    <h5 className="title text-center mt-3">
                                        <strong>{author.name}</strong>
                                    </h5>
                                </Link>
                            </div>
                        </Col>
                    ))}
                    <Paginate
                        category="authors"
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </Row>
            )}
        </>
    );
}

export default AuthorListScreen;