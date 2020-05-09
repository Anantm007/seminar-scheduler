import React from 'react';
import { Card, Form, Button, Accordion, Row, Col } from 'react-bootstrap';
import { isAuthenticated } from '../../adminAuth';

class BookingPage extends React.Component{
    constructor(props){
        super()
        this.state={
            admin: {},
            status: null,
            message: null,
            booking: {}
        }
    }

    componentDidMount(){
        var bookingId = window.location.href.slice(window.location.href.length - 24)
        var propAdmin = isAuthenticated()
        fetch(`/api/booking/get/${bookingId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': JSON.parse(localStorage.getItem('adminjwt')).token
            }
        }).then(response => response.json()).then(data =>{
            this.setState({
                admin: propAdmin.admin,
                booking: data.booking
            },() => {
                console.log(this.state.booking)
            })
        })
    }

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    }

    changeStatus = () => {
        fetch(`/api/admin/address/${this.state.booking._id}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': JSON.parse(localStorage.getItem('adminjwt')).token
            },
            body: JSON.stringify({
                status: this.state.status,
                message: this.state.message
            })
        }).then(response => response.json()).then(data =>{
            console.log(data);
            window.location = '/admin/dashboard';
        })
    }

    triggerAction = (status) => {
        this.setState({ status: status }, () => {
            this.changeStatus()
        })
    }

    render(){
        return(
            <Card sm={8} style={{ "margin": "20px" }}>
                <Card.Body>
                    <h3 className="">{this.state.booking.name}</h3><br/>
                    <div className="row"><strong>Event Description : </strong>&nbsp;&nbsp; <p >{this.state.booking.description}</p><br/></div> 
                    <div className="row"><strong>Society : </strong>&nbsp;&nbsp; <h6>{this.state.booking.societyName}</h6><br/></div> 
                </Card.Body>
                { 
                this.state.booking.status === "pending" ? 
                <div className="mb-2 text-center">
                    <Button variant="success" size="sm" onClick={() => {this.triggerAction('accepted')}}>
                    Accept
                    </Button>{' '}
                    <Accordion>
                        <Accordion.Toggle as={Card.Body} eventKey="0">
                        <Button variant="danger" size="sm">
                        Reject
                        </Button>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form>
                            <Form.Group as={Row} controlId="formGridAddress1">
                                <Form.Label column sm="2">Message</Form.Label>
                                <Col sm="10">
                                <Form.Control onChange={this.handleChange} placeholder="Please enter a message for accept rejection" />
                                </Col>
                            </Form.Group>
                            </Form>
                            <Button variant="success" size="sm" onClick={() => {this.triggerAction('rejected')}}>
                            Submit
                            </Button>
                        </Card.Body>
                        </Accordion.Collapse>
                        </Accordion>
                </div> : 
                <div className="mb-2 text-center">
                    <strong>Event Booking Status </strong>&nbsp;&nbsp; <p >{this.state.booking.status}</p>
                </div> 
                }
            </Card>
            
        )
    }
}

export default BookingPage;