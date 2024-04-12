import { CategoryEnum } from '@expenses-tracker/models';
import {
  AllInclusive,
  CardGiftcardOutlined,
  CarRental,
  Checkroom,
  ChildCare,
  Fastfood,
  HealthAndSafety,
  HouseOutlined,
} from '@mui/icons-material';
import React from 'react';

export const categoryListMap = [
  { item: CategoryEnum.CAR, icon: <CarRental /> },
  { item: CategoryEnum.CHILDREN, icon: <ChildCare /> },
  { item: CategoryEnum.FOOD, icon: <Fastfood /> },
  { item: CategoryEnum.GIFTS, icon: <CardGiftcardOutlined /> },
  { item: CategoryEnum.HEALTH, icon: <HealthAndSafety /> },
  { item: CategoryEnum.HOUSE, icon: <HouseOutlined /> },
  { item: CategoryEnum.CLOTHES, icon: <Checkroom /> },
  { item: CategoryEnum.OTHER, icon: <AllInclusive /> },
];
