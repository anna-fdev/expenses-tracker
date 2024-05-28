import React, { FC } from 'react';
import { Grid, List, ListItem, ListItemIcon } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import CircleIcon from '@mui/icons-material/Circle';
import { CategoryEnum } from '@expenses-tracker/models';

import { COLOR_HELPER_1 } from '../../constants';
import { CategorisedExpenses, categoryListMap } from '../../utils/ui-helpers';

type CategoryItemProps = {
  categorisedExpenses: CategorisedExpenses;
};

export const CategoryItem: FC<CategoryItemProps> = ({
  categorisedExpenses,
}) => {
  const categoryItem =
    categoryListMap[categorisedExpenses.label as CategoryEnum];

  return (
    <Accordion key={categorisedExpenses.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={categorisedExpenses.label}
        id={categorisedExpenses.label}
      >
        <Grid container>
          <Grid item xs={6} display="flex" gap={1} color={categoryItem.color}>
            {categoryItem.icon}
            {categorisedExpenses.label}
          </Grid>
          <Grid item xs={5} textAlign="right" color={COLOR_HELPER_1}>
            {categorisedExpenses.value.toFixed(2)}
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {categorisedExpenses.expenses.map((expense) => (
            <Grid container key={expense.id}>
              <ListItem sx={(theme) => ({ fontSize: theme.spacing(1.9) })}>
                <ListItemIcon sx={(theme) => ({ minWidth: theme.spacing(3) })}>
                  <CircleIcon
                    sx={(theme) => ({ fontSize: theme.spacing(1.3) })}
                  />
                </ListItemIcon>
                <Grid item xs={4} color={COLOR_HELPER_1}>
                  {new Date(expense.expense_date).toDateString()}
                </Grid>
                <Grid item xs={6}>
                  {expense.name}
                </Grid>
                <Grid item xs={2} color={COLOR_HELPER_1}>
                  {expense.amount.toFixed(2)}
                </Grid>
              </ListItem>
            </Grid>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
