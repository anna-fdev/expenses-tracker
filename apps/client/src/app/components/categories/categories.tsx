import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
  CardGiftcardOutlined,
  CarRental,
  ChildCare,
  Fastfood,
  HealthAndSafety,
  HouseOutlined,
} from '@mui/icons-material';

const DUMMY_CATEGORIES: any[] = [
  { item: 'Car', icon: <CarRental /> },
  { item: 'Children', icon: <ChildCare /> },
  { item: 'Food', icon: <Fastfood /> },
  { item: 'Gifts', icon: <CardGiftcardOutlined /> },
  { item: 'Health', icon: <HealthAndSafety /> },
  { item: 'House', icon: <HouseOutlined /> },
];

export const Categories: FC = () => {
  return (
    <Grid container spacing={4} mt={2}>
      {DUMMY_CATEGORIES.map((category, index) => (
        <Grid item xs={6} md={4} key={index}>
          <ListItemButton
            key={index}
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
