import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ZodIssue } from 'zod';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { registerUser } from '../api';
import { useClearServerErrorMessage } from '../hooks/useClearServerErrorMessage';
import { isZodIssue } from '../utils/error';
import parkingImage from '../assets/parking.jpg';
import type { ServerError, RegisterUserInput, RegisterUserInputKeys } from '../types';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, clearErrors, control } =
    useForm<RegisterUserInput>({});
  const { errors } = formState;

  const updatedFields = useWatch({ control, name: ['name', 'email', 'password'] });

  const { mutate } = useMutation(registerUser, {
    onSuccess: () => {
      navigate('/home');
    },
    onError: (error: AxiosError<ServerError>) => {
      const errorResponse = error.response?.data?.error;
      if (isZodIssue(errorResponse)) {
        errorResponse.forEach((err: ZodIssue) => {
          const fieldName = err.path[err.path.length - 1] as RegisterUserInputKeys;
          setError(fieldName, { message: err.message });
        });
      } else {
        setError('serverError', {
          type: 'server error',
          message: errorResponse as string,
        });
      }
    },
  });

  useClearServerErrorMessage({
    updatedFields,
    clearErrors,
    isServerError: !!errors.serverError,
  });

  const onSubmit = (data: RegisterUserInput) => {
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
            Sign Up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Name'
              autoComplete='name'
              {...register('name')}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Email'
              autoComplete='email'
              {...register('email')}
              error={!!errors.email}
              helperText={!!errors.email && errors.email.message}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='password'
              {...register('password')}
              error={!!errors.password}
              helperText={!!errors.password && errors.password.message}
            />
            {errors.serverError && (
              <span style={{ color: 'red' }}>{errors.serverError.message}</span>
            )}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link to='/login'>Already have an account? Log In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
