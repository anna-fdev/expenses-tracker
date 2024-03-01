import * as React from 'react';
import { FC } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { ExpenseForm } from '../components/forms/expense-form/expense-form';
import { useExpense } from '../store/hooks';

export const Expense: FC = () => {
  const { id } = useParams();
  const { data } = useExpense(id!);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" textAlign="center" mt={4}>
        Edit Expense
      </Typography>
      <ExpenseForm existedExpense={data} />
    </Container>
  );
};
