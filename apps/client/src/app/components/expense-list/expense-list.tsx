import { FC } from 'react';
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Add, CurrencyExchange } from '@mui/icons-material';

import { useExpenses } from '../../store/hooks';

export const ExpenseList: FC = () => {
  const { data } = useExpenses();

  return (
    <>
      {data ? (
        <Card elevation={2} sx={{ mt: 4 }}>
          {data.entries.map((entry) => (
            <Box key={entry.id} sx={{ p: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography gutterBottom component="div">
                  {entry.category}
                </Typography>
                <Typography gutterBottom component="div">
                  {entry.amount}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Card>
      ) : (
        <Box>There is no expenses yet. Add an expense</Box>
      )}
      <Grid
        container
        direction="row"
        spacing={0}
        mt={5}
        justifyContent="center"
      >
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="#"
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
            Expense Details
          </Button>
        </Stack>
      </Grid>
    </>
  );
};
