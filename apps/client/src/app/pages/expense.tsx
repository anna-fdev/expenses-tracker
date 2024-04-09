import * as React from 'react';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { ArrowGoBack, ContentContainer, ExpenseForm } from '../components';
import { useExpense } from '../store/hooks';
import { ExpenseSkeleton } from '../components/skeletons/expense-skeleton';

export const Expense: FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useExpense(id!);

  return (
    <ContentContainer>
      <Box sx={{ maxWidth: 'sm', mr: 'auto', ml: 'auto' }}>
        <ArrowGoBack />
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Edit Expense
        </Typography>
        {isLoading && <ExpenseSkeleton />}
      </Box>

      {data && <ExpenseForm existedExpense={data} />}
    </ContentContainer>
  );
};
