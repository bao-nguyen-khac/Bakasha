import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb, Dropdown } from 'react-bootstrap';
import { Meta, Loader, Message, Paginate } from 'src/components/shared';
import { Book } from 'src/components/book';
import { listBooks } from 'src/actions/bookActions';
import Filter from 'src/components/core/Filter';
import { useQuery } from 'src/hooks/useQuery';
import { TopRatedBooks } from 'src/components/home';
const BookHomeScreen = ({ match }) => {
    const query = useQuery();
    const pageNumber = match.params.pageNumber || 1;
    const sort = query.get('sort');

    const dispatch = useDispatch();
    const bookList = useSelector(state => state.bookList);
    const { loading, error, books, page, pages, count } = bookList;

    useEffect(() => {
        dispatch(listBooks(pageNumber, sort));
    }, [dispatch, pageNumber, sort]);

    return (
        <>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/book" active>
                    Sách
                </Breadcrumb.Item>
            </Breadcrumb>

            <TopRatedBooks />
            <Route render={({ history }) => <Filter history={history} />} />
            <h1 className="mt-2 text-center">Sách mới nhất</h1>
            <div>
                <Dropdown className="text-left">
                    <Dropdown.Toggle className="btn-theme" id="dropdown-basic">
                        Sắp xếp theo
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to="/book">
                                Mới nhất
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/book?sort=-sales">
                                Bán chạy nhất
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/book?sort=name">
                                A-Z
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/book?sort=-rating">
                                Sao
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/book?sort=price">
                                Giá: từ thấp đến cao
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/book?sort=-price">
                                Giá: từ cao đến thấp
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h6 className="align-right text-right">Hiển thị {1 + Number(pageNumber - 1) * 12} - {pageNumber * 12} của {count} kết quả</h6>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {books.map((book) => (
                            <Col key={book._id} sm={12} md={6} lg={3}>
                                <Book book={book} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        category="books"
                        pages={pages}
                        page={page}
                        query={`sort=${sort}`}
                    />
                </>
            )}
        </>
    );
}

export default BookHomeScreen;