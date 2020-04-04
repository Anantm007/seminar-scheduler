import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {isAuthenticated, signout} from '../../adminAuth';
import {isAuthenticatedSociety, signoutSociety} from '../../societyAuth';
import './navbar.css';
import Image from './msit_logo.jpg';

const Navigation = () => {
    if(!(isAuthenticated() || isAuthenticatedSociety())){
        return( 
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" className="navbar-brand">
                    <img
                    src={Image}
                    width="100"
                    height="80"
                    alt="logo"
                    />
                    Seminar Schedular MSIT
                </Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link href="/society/signin" className="active">Society Login</Nav.Link>
                <Nav.Link href="/admin/signin" className="active">Admin Login</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
    else if(isAuthenticated()){
        return( 
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" className="navbar-brand">
                    <img
                    src={Image}
                    width="100"
                    height="80"
                    alt="logo"
                    />
                    Seminar Schedular MSIT
                </Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link href="/admin/dashboard" className="active">Dashboard</Nav.Link>    
                <Nav.Link href="/admin/check" className="active">Events</Nav.Link>
                <Nav.Link href="/admin/book" className="active">Book Slot</Nav.Link>
                <Nav.Link className="active" onClick={signout}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
    else if(isAuthenticatedSociety()){
        return( 
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" className="navbar-brand">
                    <img
                    src={Image}
                    width="100"
                    height="80"
                    alt="logo"
                    />
                    Seminar Schedular MSIT
                </Navbar.Brand>
                <Nav className="ml-auto">
                <Nav.Link href="/society/dashboard" className="active">Dashboard</Nav.Link>    
                <Nav.Link href="/society/check" className="active">Check Slot</Nav.Link>
                <Nav.Link href="/society/book" className="active">Book Slot</Nav.Link>
                <Nav.Link className="active" onClick={signoutSociety}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;
