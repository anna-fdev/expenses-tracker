import React, { FC } from 'react';
import { Card, Skeleton } from '@mui/material';

const StyledExpensesSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={(theme) => ({
        width: '100%',
        height: theme.spacing(7),
        borderBottom: '1px solid #ccc',
      })}
    />
  );
};
export const ExpensesSkeleton: FC = () => {
  return (
    <Card
      elevation={2}
      sx={{
        mt: 4,
        mb: 4,
        mr: 'auto',
        ml: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <StyledExpensesSkeleton />
      <StyledExpensesSkeleton />
      <StyledExpensesSkeleton />
      <StyledExpensesSkeleton />
    </Card>
  );
};
