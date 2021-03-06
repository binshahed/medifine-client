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
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const { loginUser, isLoading, authError, googleSignIn } = useAuth()

  const location = useLocation()
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    console.log(data)
    loginUser(data.email, data.password, location, history)
  }

  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid sx={{ mt: 8 }} item xs={6}>
          <Typography variant='h5'>Login</Typography>
          {!isLoading && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register('email')}
                sx={{ width: '70%', m: 3 }}
                label='Enter Your Email'
                type='email'
                variant='standard'
              />
              <TextField
                sx={{ width: '70%', mb: 2 }}
                type='password'
                label='Enter Your Password'
                variant='standard'
                {...register('password', { required: true })}
              />
              <br />
              <Button
                type='submit'
                sx={{ width: '70%', m: 2 }}
                variant='contained'
              >
                {' '}
                Login
              </Button>
            </form>
          )}

          {isLoading && <CircularProgress />}
          <Typography>
            New User? Please <NavLink to='/register'>Register</NavLink>
          </Typography>
          {authError && (
            <Alert style={{ textAlign: 'center' }} severity='warning'>
              {authError}
            </Alert>
          )}
          <Button
            onClick={() => googleSignIn(location, history)}
            variant='contained'
          >
            Google SignIn
          </Button>
        </Grid>

        <Grid item xs={6}>
          <img style={{ width: '100%' }} src={loginImg} alt='' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
