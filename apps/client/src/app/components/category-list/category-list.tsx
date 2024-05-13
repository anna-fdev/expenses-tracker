import React, { FC } from 'react';
import { Box, Card, Grid, List, ListItem } from '@mui/material';

import { useExpensesCategorisedData } from '../../utils/ui-helpers';
import { COLOR_HELPER_1 } from '../../constants';

import { CategoryItem } from './category-item';

export const CategoryList: FC = () => {
  const { uniqueCategoriesMap, totalAmount } = useExpensesCategorisedData();

  return (
    <Box mt={4}>
      {uniqueCategoriesMap.map((categorisedExpenses) => (
        <CategoryItem
          key={categorisedExpenses.id}
          categorisedExpenses={categorisedExpenses}
        />
      ))}
      <Card>
        <List
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            marginRight: 'auto',
            marginLeft: 'auto',
            color: COLOR_HELPER_1,
            fontWeight: 'bold',
          }}
        >
          <ListItem>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                Total
              </Grid>
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                {totalAmount}
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
};
