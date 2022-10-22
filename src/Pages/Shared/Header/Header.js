import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import RightSideNav from '../RightSideNav/RightSideNav';
import Button from 'react-bootstrap/Button';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user);
    const handleLogout = () => {
        logout()
            .then(() => {
                console.log('successfuly logout')
            })
            .catch(error => {
                console.error('error', error.message)
            })
    }


    return (
        <Navbar collapseOnSelect className='mb-4' expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand><Link to='/'>Dragon News</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">All News</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className='align-items-center'>
                        <Link to='/profile' className='me-2'>
                            {user?.photoURL ?
                                <Image
                                    style={{ height: '40px', width: '40px', backgroundPosition: 'cover' }}
                                    roundedCircle
                                    src={user?.photoURL}>
                                </Image>
                                :
                                <FaUserCircle style={{ fontSize: '40px' }}></FaUserCircle>
                            }
                        </Link>

                        <>

                            {
                                user?.uid ?
                                    <>
                                        <span className='me-2'>{user?.displayName}</span>
                                        <Button onClick={handleLogout} variant="dark">Logout</Button>
                                    </>
                                    :
                                    <>
                                        <Button className='me-2 hover' variant="outline-primary" ><Link className='text-decoration-none hover' to='/login'>Login</Link></Button>
                                        <Button className='hover' variant="outline-primary" ><Link className='text-decoration-none hover' to='/register'>Register</Link></Button>
                                    </>
                            }
                        </>
                    </Nav>
                    <div className='d-lg-none'>
                        <LeftSideNav></LeftSideNav>
                    </div>
                    <div className='d-lg-none'>
                        <RightSideNav></RightSideNav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;