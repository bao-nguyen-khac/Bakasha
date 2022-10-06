import React, { useState } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import 'rc-slider/assets/index.css';

const Filter = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    const [genres, setGenres] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        history.push(
            `/search?keyword=${keyword}&genres=${genres}`
        );
    };

    return (
        <Form onSubmit={submitHandler} className="filter">
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <Form.Label>Thể loại</Form.Label>
                    <select
                        onChange={(e) => setGenres(e.target.value)}
                    >
                        <option value="">Chọn thể loại</option>
                        <option value="manga-comic">Manga - Comic</option>
                        <option value="khoa-hoc-ky-thuat">Khoa Học Kỹ Thuật</option>
                        <option value="trinh-tham">Trinh Thám</option>
                        <option value="tieu-thuyet">Tiểu thuyết</option>
                        <option value="tam-ly">Tâm lý</option>
                    </select>
                </Col>
                <Col sm={12} md={6} lg={1}>
                </Col>
                <Col sm={12} md={6} lg={2}>
                </Col>
                <Col sm={12} md={6} lg={1} className="text-center mt-3">
                    <Button type='submit' className='p-2'>
                        <i className="fas fa-search"></i>
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Filter;
