import * as React from 'react';
import { FC } from 'react';
import { Container } from '@mui/material';

import { ExpenseForm } from '../components/forms/expense-form/expense-form';

export const Expense: FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <ExpenseForm />
    </Container>
  );
};
