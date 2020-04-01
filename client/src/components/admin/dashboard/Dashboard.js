import React from 'react'
import {Button, Card, Container, Row, Col, Image, Nav} from 'react-bootstrap';
import {isAuthenticated} from '../../adminAuth';

const Dashboard = () => {

    const {admin: {name}} = isAuthenticated();

    return (
        <Container>
            <Row>
            <Col sm={8}>
            <Card border="danger" bg="light">
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                    <Nav.Link href="#pending">Pending</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#accepted">Accepted</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="#rejected">Rejected</Nav.Link>
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
