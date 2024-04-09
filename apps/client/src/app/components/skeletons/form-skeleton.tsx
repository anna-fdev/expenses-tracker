import Box from '@mui/material/Box';
import React, { FC } from 'react';
import { Skeleton } from '@mui/material';

export const FormSkeleton: FC = () => {
  return (
    <Box
      sx={{
        mt: 8,
        mb: 4,
        mr: 'auto',
        ml: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100%',
        width: '400px',
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton
        variant="rounded"
        sx={(theme) => ({
          mt: 2,
          width: '30%',
          height: theme.spacing(4),
        })}
      />
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
          mt: 4,
          width: '100%',
          height: theme.spacing(5),
        })}
      />

      <Skeleton
        variant="text"
        sx={(theme) => ({
          mt: 2,
          width: '70%',
          fontSize: theme.spacing(3.6),
          alignSelf: 'end',
        })}
      />
    </Box>
  );
};
