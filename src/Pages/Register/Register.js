import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import loginImg from '../../images/login.png'
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Register = () => {
  const { user, isLoading, registerUser, authError } = useAuth()

  const history = useHistory()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    if (data.password !== data.password1) {
      alert('password dose not matched')
      return
    }
    registerUser(data.email, data.password, data.name, history)
    console.log(data)
  }

  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid sx={{ mt: 8 }} item xs={6}>
          <Typography variant='h5'>Register</Typography>
          {!isLoading && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('name', { required: true })}
                sx={{ width: '70%', m: 2 }}
                label='Enter Your name'
                variant='standard'
                type='text'
              />
              <TextField
                {...register('email', { required: true })}
                sx={{ width: '70%', mb: 2 }}
                label='Enter Your Email'
                variant='standard'
                type='email'
              />
              <TextField
                sx={{ width: '70%', mb: 2 }}
                type='password'
                label='Enter Your Password'
                variant='standard'
                {...register('password', { required: true })}
              />
              <TextField
                sx={{ width: '70%', mb: 2 }}
                type='password'
                label='Retype Password'
                variant='standard'
                {...register('password1', { required: true })}
              />
              <br />
              <Button
                type='submit'
                sx={{ width: '70%', m: 2 }}
                variant='contained'
              >
                {' '}
                Register
              </Button>
            </form>
          )}
          {isLoading && <CircularProgress />}
          {user?.email && (
            <Alert style={{ textAlign: 'center' }} severity='success'>
              User Successfully Created
            </Alert>
          )}
          {authError && (
            <Alert style={{ textAlign: 'center' }} severity='warning'>
              {authError}
            </Alert>
          )}

          <Typography>
            Already have an account? Please <NavLink to='/login'>Login</NavLink>
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <img style={{ width: '100%' }} src={loginImg} alt='' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
