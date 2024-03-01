import * as React from 'react';
import { FC } from 'react';
import { Container, Typography } from '@mui/material';

import { ExpenseForm } from '../components/forms/expense-form/expense-form';

export const CreateExpense: FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" textAlign="center" mt={4}>
        Add New Expense
      </Typography>
      <ExpenseForm />
    </Container>
  );
};
