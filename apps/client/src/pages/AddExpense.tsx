import React from 'react';
import Grid from '@mui/material/Grid';
import Categories from '../components/Categories';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const AddExpense = () => {
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
          <Typography textAlign="center" variant="h4" py={2}>
            Add Expense
          </Typography>
          <Categories />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddExpense;
