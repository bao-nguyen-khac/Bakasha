import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { logout } from 'src/actions/userActions';
import logo from 'src/assets/images/logo.png'

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar variant='dark' className='text-light' expand='lg' collapseOnSelect sticky="top">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href="/book">
                            <Image src={logo} alt="Logo" width="80" className="avatar" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav className='ml-auto' >
                            <LinkContainer to="/book">
                                <Nav.Link>Sách</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/author">
                                <Nav.Link >Tác giả</Nav.Link>
                            </LinkContainer>
                            {/* <LinkContainer to="/post">
                                <Nav.Link>Post</Nav.Link>
                            </LinkContainer> */}
                            <LinkContainer to="/about">
                                <Nav.Link>Về chúng tôi</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/contact">
                                <Nav.Link>Liên lạc</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart'></i> Giỏ hàng
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <>
                                    <Image src={userInfo.avatar} width="40" height="40" roundedCircle />
                                    <NavDropdown title={userInfo.name} id='username'>

                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Hồ sơ</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Đăng xuất
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Đăng nhập
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
