import React, { useState } from 'react'
import {Button, Card, Container, Row, Col, Image, Nav} from 'react-bootstrap';
import {isAuthenticated} from '../../adminAuth';
import { getBookingRequests } from '../apiAdmin';

const Dashboard = () => {

    var adminDetails = isAuthenticated();

    const [values, setValues] = useState({
        admin: adminDetails,
        bookings: [],
        type: '',
        error: null,
        loading: false
    })

    const { admin, bookings, type, error, loading } = values

    const clickSubmit = (type) => {
        setValues({...values, error: false, loading: true});
        console.log({loading})
        getBookingRequests(type)
        .then(data => {
            console.log(data)
            if(data.success === false)
            {
                setValues({...values, error: 'Get Bookings Faced Error', loading: false})
            }
            else
            {
                setValues({...values, bookings: data.bookings, success: true, loading: false});
                console.log({bookings, admin})
            }
        })
    }

    const getBookings = (type) => {
        console.log('Hello', type)
        clickSubmit(type)
    }

    return (
        <Container>
            <Row>
            <Col sm={8}>
            <Card border="danger" bg="light">
            <Card.Header>
                <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link href="#first" onClick={() => getBookings('pending')}>Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#second" onClick={() => getBookings('accepted')}>Accepted</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#third" onClick={() => getBookings('rejected')}>Rejected</Nav.Link>
                </Nav.Item>
                </Nav>
            </Card.Header>
                <Card.Body>
                    {}
                </Card.Body>
            </Card>
            <br />
            <br />
            </Col>

            <Col sm={4}>
            <Card border="danger" bg="light">
                <Card.Header as="h4">Profile Info</Card.Header>
                <Card.Body>
                </Card.Body>
            </Card>
            <br />
            <br />
            </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
