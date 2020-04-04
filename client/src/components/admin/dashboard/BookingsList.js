import React from 'react';
import Booking from './Booking';

const BookingList=({bookings})=>{
	const BookingComponent = bookings.map((booking)=>{
        console.log(booking)
		return <Booking data={booking} />
	})
	return(
		<div>
		{BookingComponent}
		</div>
		);
}

export default BookingList;