import React, { useState } from 'react'
import {Button, Card, Container, Row, Col, Image, Nav} from 'react-bootstrap';
import {isAuthenticated} from '../../adminAuth';
import { getBookingRequests } from '../apiAdmin';

const Dashboard = () => {

    var adminDetails = isAuthenticated();

    // const [bookings, setBookings] = useState([]);

    const [values, setValues] = useState({
        admin: adminDetails,
        bookings: [],
        type: '',
        error: '',
        loading: false,
        success: false
    })

    const {admin, type, error, bookings, success, loading} = values;

    const fetchData  = (type) => {
        setValues({...values, error: false, loading: true});
        getBookingRequests(type)
        .then(data => {
            console.log('hey',data.bookings)
            if(data.success === false)
            {
                setValues({...values, error: 'Get Bookings Faced Error', loading: false})
            }
            else
            {
                // setBookings(data.bookings)
                setValues({...values, bookings: data.bookings, success: true, loading: false});
                console.log('HIII', bookings)
            }
        })
    }

    return (
        <Container>
            <Row>
            <Col sm={8}>
            <Card border="danger" bg="light">
            <Card.Header>
                <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link href="#first" onClick={() => fetchData('pending')}>Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#second" onClick={() => fetchData('accepted')}>Accepted</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#third" onClick={() => fetchData('rejected')}>Rejected</Nav.Link>
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
