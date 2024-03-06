import React from 'react';
import { Typography } from '@mui/material';

import { useUserLoggedIn } from '../store/hooks';
import { ContentContainer, ExpenseList } from '../components';

export const Home = () => {
  const isLoggedIn = useUserLoggedIn();

  return (
    <ContentContainer sx={{ mb: 2 }}>
      {isLoggedIn ? (
        <ExpenseList />
      ) : (
        <Typography component="h4" textAlign="center" mt={4}>
          Home Page
        </Typography>
      )}
    </ContentContainer>
  );
};
