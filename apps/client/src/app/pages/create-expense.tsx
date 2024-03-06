import * as React from 'react';
import { FC } from 'react';
import { Typography } from '@mui/material';

import { ExpenseForm } from '../components/forms/expense-form/expense-form';
import { ContentContainer } from '../components';

export const CreateExpense: FC = () => {
  return (
    <ContentContainer>
      <Typography component="h1" variant="h5" textAlign="center" mt={4}>
        Add New Expense
      </Typography>
      <ExpenseForm />
    </ContentContainer>
  );
};
