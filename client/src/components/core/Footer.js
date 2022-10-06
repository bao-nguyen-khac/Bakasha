import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from 'src/assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-dark text-light">
            <Container className="py-1" variant="dark">
                <Row className="py-4">
                    <Col lg={4} md={6} >
                        <img src={logo} alt="logo" width={180} className="mb-3 avatar" variant="dark" />
                        <p className="font-italic text-light">BaKasha nhận đặt hàng trực tuyến và giao hàng tận nơi.</p>
                        <ul className="list-inline mt-4">
                            <li className="list-inline-item"><a href="#" target="_blank" title="twitter"><i class="fab fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="facebook"><i class="fab fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="instagram"><i class="fab fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="pinterest"><i class="fab fa-pinterest"></i></a></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6 className="text-uppercase font-weight-bold mb-4 text-light">Dịch vụ</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-light">Điều khoản sử dụng</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Chính sách bảo mật</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Giới thiệu</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Hệ thống nhà sách</a></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={6}>
                        <h6 className="text-uppercase font-weight-bold mb-4 text-light">Hổ trợ</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-light">Chỉnh sách đổi trả</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Phương thức vận chuyển</a></li>
                            <li className="mb-2"><a href="#" className="text-light">Phương thức thanh toán</a></li>
                        </ul>
                    </Col>
                    <Col lg={4} md={6}>
                        <h6 className="text-uppercase font-weight-bold mb-4 text-light">Bản tin</h6>
                        <p className="text-light mb-4">Đăng ký nhận bản tin</p>
                        <div className="p-1 rounded border">
                            <div className="input-group">
                                <input type="email" placeholder="Nhập địa chỉ email" aria-describedby="button-addon1" className="form-control border-0 shadow-0" />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link text-light"><i className="fa fa-paper-plane" /></button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
