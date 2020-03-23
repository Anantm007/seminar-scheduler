import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


const Navigation = () => {
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Seminar Schedular MSIT</Navbar.Brand>
            <Nav className="ml-auto">
            <Nav.Link href="/society/signin" className="active">Society Login</Nav.Link>
            <Nav.Link href="/admin/signin" className="active">Admin Login</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation;