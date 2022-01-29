import { Alert, Container, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import Booking from '../Booking/Booking'

const bookings = [
  {
    id: 1,
    name: 'Teeth Orthodonics',
    time: '08.00 AM - 09.00 AM',
    price: 150,
    space: 10
  },
  {
    id: 2,
    name: 'Cosmetic Dentistry',
    time: '09.00 AM - 10.00 AM',
    price: 250,
    space: 8
  },
  {
    id: 3,
    name: 'Teeth Cleaning',
    time: '10.00 AM - 11.00 AM',
    price: 350,
    space: 9
  },
  {
    id: 4,
    name: 'Cavity Protection',
    time: '11.00 AM - 12.00 PM',
    price: 450,
    space: 5
  },
  {
    id: 5,
    name: 'Pediatric Dental',
    time: '06.00 PM - 07.00 PM',
    price: 550,
    space: 10
  },
  {
    id: 6,
    name: 'Oral Surgery',
    time: '07.00 PM - 08.00 PM',
    price: 650,
    space: 10
  }
]

const AvailableAppointments = ({ date }) => {
  const [bookingSuccess, setBookingSuccess] = useState(false)
  return (
    <Container>
      <Typography variant='h4' sx={{ color: 'info.main', mb: 3 }}>
        Available Appointments on {date.toDateString()}
      </Typography>

      {bookingSuccess && (
        <Alert severity='success'>Appointment Insert Successfully</Alert>
      )}

      <Grid container spacing={2}>
        {bookings.map(booking => (
          <Booking
            key={booking.id}
            booking={booking}
            date={date}
            setBookingSuccess={setBookingSuccess}
          ></Booking>
        ))}
      </Grid>
    </Container>
  )
}

export default AvailableAppointments
