import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../Navigation/Nav.scss'
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import { LogoutUser } from '../../service/userService'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation()
    const history = useHistory()

    const handleLogout = async () => {
        let data = await LogoutUser(); //clear cookie
        logoutContext()//clear user in context

        if (data && data.EC === 0) {
            toast.success('Log out successds...')
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === '/') {

        return (
            <>
                <div className='nav-header'>
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">
                                <span className='brand-name'>React</span> </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to='/' exact className='nav-link'>Home</NavLink>
                                    <NavLink to='/users' className='nav-link'>Users</NavLink>
                                    <NavLink to='/roles' className='nav-link'>Roles</NavLink>
                                    <NavLink to='/projects' className='nav-link'>Projects</NavLink>
                                    <NavLink to='/about' className='nav-link'>About</NavLink>
                                </Nav>

                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link'>Welcome {user.account.username}!</Nav.Item>

                                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item >Change password</NavDropdown.Item>
                                                <NavDropdown.Item >
                                                    <span onClick={() => { handleLogout() }}> Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <div>
                                            <Link className='nav-link' to='/login'>Login</Link>
                                        </div>
                                    }


                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    } else {
        return <></>
    }
}

export default NavHeader;