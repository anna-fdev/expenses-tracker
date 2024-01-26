import React from 'react';
import Pie from '../components/Pie';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Add, CurrencyExchange } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Grid item xs={12} sm={6}>
          <Pie />
        </Grid>
      </Grid>
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
            to="/add-expense"
            variant="contained"
            startIcon={<Add />}
          >
            Add new expense
          </Button>
          <Button
            component={Link}
            to="/expense-details"
            variant="contained"
            startIcon={<CurrencyExchange />}
          >
            Expense Details
          </Button>
        </Stack>
      </Grid>
    </Container>
  );
};

export default Home;

//TODO make Pie Chart responsive
