import Box from '@mui/material/Box';
import React, { FC } from 'react';
import { Typography } from '@mui/material';

export const LoadingBox: FC = () => {
  return (
    <Box>
      <Typography role="status">Loading...</Typography>
    </Box>
  );
};
