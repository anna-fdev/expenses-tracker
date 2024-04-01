import * as React from 'react';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { ArrowGoBack, ContentContainer, ExpenseForm } from '../components';

export const CreateExpense: FC = () => {
  return (
    <ContentContainer>
      <Box sx={{ maxWidth: 'sm', mt: 4, mr: 'auto', ml: 'auto' }}>
        <ArrowGoBack />
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Add New Expense
        </Typography>
      </Box>
      <ExpenseForm />
    </ContentContainer>
  );
};
