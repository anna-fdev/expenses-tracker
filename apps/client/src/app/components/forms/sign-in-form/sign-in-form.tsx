import * as React from 'react';
import { FC, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useSignInMutation } from '../../../store/services';
import { ROUTES } from '../../../constants';
import { showSnackbar } from '../../../store/slices';
import { useAppDispatch } from '../../../store/hooks';

const SignInFormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(5, 'Password is too Short!').required('Required'),
});

type FormValues = {
  email: string;
  password: string;
};

export const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const [signIn, result] = useSignInMutation();
  const navigate = useNavigate();
  const { isError } = result;

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInFormSchema,
    onSubmit: async (values, formikHelpers) => {
      const response = await signIn(values);

      if ('data' in response && response.data.token) {
        navigate(ROUTES.HOME);
      }
    },
  });

  useEffect(() => {
    if (isError) {
      dispatch(
        showSnackbar({
          message: 'Email or password is wrong!',
          severity: 'error',
        })
      );
    }
  }, [isError]);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container sx={{ justifyContent: 'flex-end' }}>
          <Grid item>
            <Link to={ROUTES.SIGN_UP}>Do not have an account? Sign up</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
