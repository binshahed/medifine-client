import { useState, useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const AppointmentsDashBoard = ({ date }) => {
  const { user, token } = useAuth()
  const [appointments, setAppointments] = useState([])
  useEffect(() => {
    const url = `http://localhost:5000/appoints?email=${user.email}&date=${date}`
    fetch(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data))
  }, [date])

  return (
    <div>
      <h2>Appointments</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Time</TableCell>
              {/* <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map(row => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AppointmentsDashBoard
