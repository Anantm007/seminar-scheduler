import React from 'react';
import { Card } from 'react-bootstrap';

const Booking = (props) => {
    console.log(props)
    return(
        <Card>
            <Card.Body>
                <Card.Title>{props.data.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Society: {props.data.societyName}</Card.Subtitle>
                <Card.Text>Event Description: {props.data.description}</Card.Text>
                <Card.Text>Event Date: {props.data.eventDate.date}-{props.data.eventDate.month}-{props.data.eventDate.year}</Card.Text>
                <Card.Text>Event Timings: ({props.data.startTime} - {props.data.endTime})</Card.Text>
                <Card.Link href={`/admin/dashboard/${props.data._id}`}>View More</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default Booking;