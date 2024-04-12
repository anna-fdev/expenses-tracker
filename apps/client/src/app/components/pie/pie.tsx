import React, { FC, PropsWithChildren } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { useExpenses } from '../../store/hooks';

export const pieParams = {
  width: 600,
  maxWidth: '100%',
  height: 300,
  margin: { right: 5 },
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: theme.spacing(2.5),
}));

const PieCenterLabel: FC<PropsWithChildren> = ({ children }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
};

export const Pie: FC = () => {
  const { data } = useExpenses();
  const { entries = [] } = data || {};

  const getPieChartData = () => {
    const uniqueCategories = [
      ...new Set(data?.entries.map((expense) => expense.category)),
    ];

    return uniqueCategories.map((category, idx) => {
      const expensesByCategory = entries.filter(
        (expense) => expense.category === category
      );

      const totalByCategory = expensesByCategory.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);

      return {
        id: idx,
        label: category,
        value: totalByCategory,
      };
    });
  };

  const totalAmount = data?.entries
    .reduce((accumulator, currentAmount) => {
      return accumulator + currentAmount.amount;
    }, 0)
    .toFixed(2);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 'sm',
        margin: '0 auto',
      }}
    >
      <PieChart
        series={[
          {
            data: getPieChartData(),
            innerRadius: 55,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -360,
            endAngle: 360,
            cx: '50%',
            cy: '50%',
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: 'gray',
            },
          },
        ]}
        {...pieParams}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 2,
          },
        }}
      >
        <PieCenterLabel>${totalAmount}</PieCenterLabel>
      </PieChart>
    </Box>
  );
};
