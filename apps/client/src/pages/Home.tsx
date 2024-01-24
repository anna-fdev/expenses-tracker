import React from 'react';
import Pie from '../components/Pie';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';

const Home = () => {
  return (
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
      <Button variant="contained" startIcon={<Add />}>
        Add new expense
      </Button>
    </Grid>
  );
};

export default Home;

//TODO make Pie Chart responsive
