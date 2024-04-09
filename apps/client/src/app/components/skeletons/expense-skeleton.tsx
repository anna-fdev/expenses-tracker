import React, { FC } from 'react';
import { Skeleton } from '@mui/material';

export const ExpenseSkeleton: FC = () => {
  return (
    <>
      <Skeleton
        variant="rounded"
        sx={(theme) => ({
          mt: 4,
          width: '100%',
          height: theme.spacing(7),
        })}
      />
      <Skeleton
        variant="rounded"
        sx={(theme) => ({
          mt: 2,
          width: '100%',
          height: theme.spacing(7),
        })}
      />
      <Skeleton
        variant="rounded"
        sx={(theme) => ({
          mt: 2,
          width: '100%',
          height: theme.spacing(7),
        })}
      />
      <Skeleton
        variant="rounded"
        sx={(theme) => ({
          mt: 2,
          width: '100%',
          height: theme.spacing(7),
        })}
      />
      <Skeleton
        variant="rounded"
        sx={(theme) => ({
          mt: 4,
          width: '100%',
          height: theme.spacing(5),
        })}
      />
    </>
  );
};
