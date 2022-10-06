import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Jumbotron, Button, Container } from 'react-bootstrap';
import { Genres, TopAuthors, SaleBooks } from 'src/components/home';
import { Meta } from 'src/components/shared';

const HomeScreen = () => {
    return (
        <>
            <Meta />
            <Jumbotron className="text-center bg-img-3">
                <Row>
                    <Col className="p-5">
                        <h1>Tiểu thuyết mới trong BaKasha</h1>
                        <p>Chào mừng bạn đến với hiệu sách của chúng tôi</p>
                        <Link to="/book">
                            <Button className="btn btn-theme">
                                Mua ngay <i className="fas fa-shopping-cart"></i>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <h2 className="text-center p-3">Thể loại</h2>
                <Genres />
            </Container>
            <Container>
                <h2 className="text-center p-3 mt-5">Sách bán chạy</h2>
                <SaleBooks />
            </Container>
            <TopAuthors />
        </>
    );
}

export default HomeScreen;