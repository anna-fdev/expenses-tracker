import { FC } from 'react';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, CurrencyExchange } from '@mui/icons-material';

import { ROUTES } from '../../constants';

export const ExpenseControls: FC = () => {
  return (
    <Grid
      container
      sx={{
        flexDirection: 'row',
        mt: 5,
        mb: 5,
        justifyContent: 'space-evenly',
      }}
    >
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
        to={ROUTES.CATEGORIES}
        variant="contained"
        color="secondary"
        startIcon={<CurrencyExchange />}
      >
        Expenses by Category
      </Button>
    </Grid>
  );
};
