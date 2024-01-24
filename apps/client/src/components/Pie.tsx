import React, { FC, PropsWithChildren } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts';
import { styled } from '@mui/material/styles';

const data = [
  { id: 0, value: 10, label: 'Car' },
  { id: 1, value: 15, label: 'Children' },
  { id: 2, value: 20, label: 'Food' },
  { id: 3, value: 30, label: 'Gifts' },
  { id: 4, value: 5, label: 'Health' },
  { id: 5, value: 40, label: 'House' },
];

const pieParams = {
  width: 600,
  maxWidth: '100%',
  height: 300,
  margin: { right: 5 },
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

const sum = data.reduce((accumulator, object) => {
  return accumulator + object.value;
}, 0);

const PieCenterLabel: FC<PropsWithChildren> = ({ children }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
};

const Pie = () => {
  return (
    <PieChart
      series={[
        {
          data,
          innerRadius: 35,
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
      <PieCenterLabel>${sum}</PieCenterLabel>
    </PieChart>
  );
};

export default Pie;
