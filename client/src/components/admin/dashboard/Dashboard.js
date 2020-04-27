import React from 'react';
import { Card, Container, Row, Col, Nav } from 'react-bootstrap';
import { isAuthenticated } from '../../adminAuth';
import BookingList from './BookingsList';

class Dashboard extends React.Component{

    constructor(props){
        super()
        this.state = {
            admin: {},
            bookings: [],
            type: null
        }
    }

    componentDidMount(){
        var propAdmin = isAuthenticated()
        console.log(propAdmin.admin)
        this.setState({ admin: propAdmin.admin }, ()=> {
            console.log(this.state.admin)
        })
    }

    fetchBookings = (type) => {
        fetch(`/api/admin/bookings/${type}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': JSON.parse(localStorage.getItem('adminjwt')).token
            },
        }).then(response => response.json()).then(data =>{
            this.setState({ bookings: data.bookings })
            this.setState({ type })
            console.log(this.state.bookings)
        })
    }

    doOperation = (type) => {
        this.fetchBookings(type)
    }

    render(){
        return(
            <Container>
                <Row style = {{ "padding-top": "10px" }}>
                <Col sm={8}>
                <Card border="danger" bg="light">
                <Card.Header>
                    <Nav variant="tabs">
                    <Nav.Item>
                        <Nav.Link href="#first" onClick={() => this.doOperation('pending')}>Pending</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#second" onClick={() => this.doOperation('accepted')}>Accepted</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#third" onClick={() => this.doOperation('rejected')}>Rejected</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Card.Header>
                    <Card.Body>
                        { this.state.bookings.length ? <BookingList bookings={this.state.bookings} /> : <h1> There are No Bookings of {this.state.type} Type. </h1> }
                    </Card.Body>
                </Card>
                <br />
                <br />
                </Col>

                <Col sm={4}>
                <Card border="danger" bg="light" className="text-center">
                    <Card.Header as="h4">Profile Info</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.state.admin.name}</Card.Title>
                        <hr/>
                        <Card.Text>{this.state.admin.email}</Card.Text>
                        <hr/>
                        <Card.Text>Unique Id: {this.state.admin._id}</Card.Text>
                        <hr/>
                        <Nav.Link href={`/admin/${this.state.admin._id}/settings`} className="nav-link">Admin Settings (Profile)</Nav.Link>
                        {/* <Button variant="primary">Edit Profile</Button> */}
                    </Card.Body>
                    <Card.Footer className="text-muted">Seminar Hall Managed: No. {this.state.admin.seminarHallsIncharge} </Card.Footer>
                </Card>
                <br />
                <br />
                </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;