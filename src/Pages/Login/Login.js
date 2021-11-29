import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import loginImg from '../../images/login.png'
import { Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid sx={{ mt: 8 }} item xs={6}>
          <Typography>Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('email')}
              sx={{ width: '70%', m: 3 }}
              label='Enter Your Email'
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
        </Grid>

        <Grid item xs={6}>
          <img style={{ width: '100%' }} src={loginImg} alt='' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
