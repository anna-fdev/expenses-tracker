import * as React from 'react';
import { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { ArrowGoBack, Categories, ContentContainer } from '../components';

export const ExpenseCategories: FC = () => {
  return (
    <ContentContainer>
      <Box sx={{ maxWidth: 'sm', mr: 'auto', ml: 'auto' }}>
        <ArrowGoBack />
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          Expenses By Category
        </Typography>
        <Categories />
      </Box>
    </ContentContainer>
  );
};
