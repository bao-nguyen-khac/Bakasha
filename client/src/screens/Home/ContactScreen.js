import React from 'react';
import { Meta } from 'src/components/shared';
import { Container, Col, Row, Image, Breadcrumb, Form, Button } from 'react-bootstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import shop from 'src/assets/images/shop.jpg';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 21.027763,
    lng: 105.834160
};

const ContactScreen = () => {
    return (
        <Container>
            <Meta />
            <Breadcrumb>
                <Breadcrumb.Item href="#">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Liên hệ</Breadcrumb.Item>
            </Breadcrumb>
            {/* <LoadScript
                googleMapsApiKey="AIzaSyCYT9eSQeXaxZK1wora_np2r4g0c5cWxCw"
            >
                {/* <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                </GoogleMap> */}
            {/* </LoadScript> */}
            <Row className="mt-5">
                <Col sm={12} md={6}>
                    <Image src={shop} fluid />
                </Col>
                <Col sm={12} md={6}>
                    <div className="p-3">
                        <h2><strong>BOOKSHOP</strong></h2>

                        <i className="fas fa-map-marker-alt"></i> <i> Ho Chi Minh, VietNam </i><br /> <br />
                        <i className="fas fa-envelope"></i> <i> admin@gmail.com </i> <br /> <br />
                        <i className="fas fa-phone"></i> <i>Call Us: 0123 456 789</i>  <br /> <br />
                        <Form className="mt-3">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Control placeholder="Your name" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId="formGridMessage">
                                <Form.Control className="border" as="textarea" rows={3} />
                            </Form.Group>

                            <Button className="btn-theme" fullWidth type="submit">
                                Gửi
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactScreen;