import { FC } from 'react';
import { Box } from '@mui/material';

import { useGetExpensesQuery } from '../../store/services';

export const ExpenseList: FC = () => {
  useGetExpensesQuery();

  return <Box>expense list</Box>;
};
