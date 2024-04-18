import React, { FC } from 'react';
import { Box, Grid, List } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
  categoryListMap,
  useExpensesCategorisedData,
} from '../../utils/ui-helpers';

export const CategoryList: FC = () => {
  const { uniqueCategoriesMap } = useExpensesCategorisedData();

  const getCategoryIcon = (label: string) => {
    const categoryMappedItem = categoryListMap.find(
      (listItem) => listItem.item === label
    );

    return categoryMappedItem?.icon;
  };

  return (
    <Box mt={4}>
      {uniqueCategoriesMap.map((category) => (
        <Accordion key={category.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={category.label}
            id={category.label}
          >
            <Grid container>
              <Grid xs={6} display="flex" gap={1}>
                {getCategoryIcon(category.label)}
                {category.label}
              </Grid>
              <Grid xs={5} textAlign="right">
                {category.value}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {category.expenses.map((expense) => (
                <Grid container key={expense.id}>
                  <Grid xs={2}>{expense.amount}</Grid>
                  <Grid xs={6}>{expense.name}</Grid>
                  <Grid xs={4} textAlign="right">
                    {new Date(expense.expense_date).toDateString()}
                  </Grid>
                </Grid>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
