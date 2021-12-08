import React from 'react'
import Calender from '../../Shared/Calendar/Calendar'
import { Grid } from '@mui/material'
import AppointmentsDashBoard from '../AppointmentsDashBoard/AppointmentsDashBoard'

const DashboardHomeMain = () => {
  const [date, setDate] = React.useState(new Date())

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Calender date={date} setDate={setDate}></Calender>
      </Grid>
      <Grid item xs={12} md={6}>
        <AppointmentsDashBoard date={date}></AppointmentsDashBoard>
      </Grid>
    </Grid>
  )
}

export default DashboardHomeMain
