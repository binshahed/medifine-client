import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Container } from '@mui/material'

const Navigation = () => {
  const { user, logOut } = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        {/* <Container> */}
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <NavLink to='/'>Doctors Portal</NavLink>
          </Typography>
          <Link to='/appointment'>
            <Button color='inherit'>Appointment</Button>
          </Link>
          {user?.email ? (
            <Box>
              <NavLink
                style={{ textDecoration: 'none', color: '#fff' }}
                to='/dashboard'
              >
                Dashboard
              </NavLink>
              <Button onClick={logOut} variant='contained'>
                LogOut
              </Button>
            </Box>
          ) : (
            <NavLink
              style={{ textDecoration: 'none', color: '#fff' }}
              to='/login'
            >
              <Button color='inherit'>Login</Button>
            </NavLink>
          )}
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </Box>
  )
}

export default Navigation
