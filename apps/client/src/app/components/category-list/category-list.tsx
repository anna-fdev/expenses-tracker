import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { categoryListMap } from '../../utils/ui-helpers/category-list-map';

export const CategoryList: FC = () => {
  return (
    <Grid container spacing={4} mt={2}>
      {categoryListMap.map((category, index) => (
        <Grid item xs={6} md={4} key={index}>
          <ListItemButton
            sx={{
              py: 3,
              minHeight: 32,
              boxShadow: 5,
              borderRadius: 2,
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {category.icon}
            </ListItemIcon>
            <ListItemText
              primary={category.item}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 'medium',
              }}
            />
          </ListItemButton>
        </Grid>
      ))}
    </Grid>
  );
};
