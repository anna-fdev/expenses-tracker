import React from 'react';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import { useUserLoggedIn } from '../store/hooks';
import { ExpenseList } from '../components';

export const Home = () => {
  const isLoggedIn = useUserLoggedIn();

  return (
    <Container maxWidth="lg" sx={{ mb: 2 }}>
      {isLoggedIn ? (
        <ExpenseList />
      ) : (
        <Typography component="h4" textAlign="center">
          Please Sign In
        </Typography>
      )}
    </Container>
  );
};
