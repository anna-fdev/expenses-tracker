import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {
  CardGiftcardOutlined,
  CarRental,
  ChildCare,
  ExpandMore,
  Fastfood,
  HealthAndSafety,
  HouseOutlined,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const DUMMY_CATEGORIES: any[] = [
  { id: 0, item: 'Car', icon: <CarRental /> },
  { id: 1, item: 'Children', icon: <ChildCare /> },
  { id: 2, item: 'Food', icon: <Fastfood /> },
  { id: 3, item: 'Gifts', icon: <CardGiftcardOutlined /> },
  { id: 4, item: 'Health', icon: <HealthAndSafety /> },
  { id: 5, item: 'House', icon: <HouseOutlined /> },
];

const ExpenseDetails = () => {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ width: '100%', maxWidth: '100%' }}
      >
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" py={2} textAlign="center">
            Expense Details
          </Typography>
          {DUMMY_CATEGORIES.map((category) => (
            <Accordion key={category.id} elevation={5} disableGutters>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={category.id}
                id={category.id}
                sx={{
                  backgroundColor: 'rgba(224,224,224,0.4)',
                }}
              >
                <Typography>{category.item}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ borderTop: '1px solid rgba(0, 0, 0, .125)' }}
              >
                <Typography>{category.icon}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseDetails;
