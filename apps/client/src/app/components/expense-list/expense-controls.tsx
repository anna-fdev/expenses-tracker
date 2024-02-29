import { FC } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, CurrencyExchange } from '@mui/icons-material';

import { ROUTES } from '../../constants';

export const ExpenseControls: FC = () => {
  return (
    <Grid container direction="row" spacing={0} mt={5} justifyContent="center">
      <Stack direction="row" spacing={2}>
        <Button
          component={Link}
          to={ROUTES.CREATE_EXPENSE}
          variant="contained"
          color="secondary"
          startIcon={<Add />}
        >
          Add new expense
        </Button>
        <Button
          component={Link}
          to="#"
          variant="contained"
          color="secondary"
          startIcon={<CurrencyExchange />}
        >
          Expenses by Category
        </Button>
      </Stack>
    </Grid>
  );
};
