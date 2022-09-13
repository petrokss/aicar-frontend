import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../api';
import { useClearServerErrorMessage } from '../hooks/useClearServerErrorMessage';
import parkingImage from '../assets/parking.jpg';
import type { LoginUserInput } from '../types';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, clearErrors, control } =
    useForm<LoginUserInput>();
  const { errors } = formState;
  const updatedFields = useWatch({ control, name: ['username', 'password'] });

  const { mutate } = useMutation(login, {
    onSuccess: () => {
      navigate('/home');
    },
    onError: (error: AxiosError) => {
      let message = '';
      if ([400, 401, 404].some((status) => status === error?.response?.status)) {
        message = 'The username or password is incorrect';
      } else {
        message = 'Internal server error';
      }
      setError('serverError', {
        type: 'server error',
        message: message,
      });
    },
  });

  useClearServerErrorMessage({
    updatedFields,
    clearErrors,
    isServerError: !!errors.serverError,
  });

  const onSubmit = (data: LoginUserInput) => {
    mutate(data);
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${parkingImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Username'
              autoComplete='username'
              {...register('username')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='password'
              {...register('password')}
            />
            {errors.serverError && (
              <span style={{ color: 'red' }}>{errors.serverError.message}</span>
            )}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link to='/register'>Don&apos;t have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
