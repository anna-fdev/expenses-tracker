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

import {
  CATEGORY_COLOR_CAR,
  CATEGORY_COLOR_CHILDREN,
  CATEGORY_COLOR_CLOTHES,
  CATEGORY_COLOR_FOOD,
  CATEGORY_COLOR_GIFTS,
  CATEGORY_COLOR_HEALTH,
  CATEGORY_COLOR_HOUSE,
  CATEGORY_COLOR_OTHER,
} from '../../constants';

export const categoryListMap = {
  [CategoryEnum.CAR]: {
    icon: <CarRental />,
    color: CATEGORY_COLOR_CAR,
  },
  [CategoryEnum.CHILDREN]: {
    icon: <ChildCare />,
    color: CATEGORY_COLOR_CHILDREN,
  },
  [CategoryEnum.FOOD]: {
    icon: <Fastfood />,
    color: CATEGORY_COLOR_FOOD,
  },
  [CategoryEnum.GIFTS]: {
    icon: <CardGiftcardOutlined />,
    color: CATEGORY_COLOR_GIFTS,
  },
  [CategoryEnum.HEALTH]: {
    icon: <HealthAndSafety />,
    color: CATEGORY_COLOR_HEALTH,
  },
  [CategoryEnum.HOUSE]: {
    icon: <HouseOutlined />,
    color: CATEGORY_COLOR_HOUSE,
  },
  [CategoryEnum.CLOTHES]: {
    icon: <Checkroom />,
    color: CATEGORY_COLOR_CLOTHES,
  },
  [CategoryEnum.OTHER]: {
    icon: <AllInclusive />,
    color: CATEGORY_COLOR_OTHER,
  },
};
