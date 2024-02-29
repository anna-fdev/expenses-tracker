import { FC } from 'react';
import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';

import { useExpenses } from '../../store/hooks';
import { ROUTES } from '../../constants';

import { ExpenseControls } from './expense-controls';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey.A200,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}));

export const ExpenseList: FC = () => {
  const { data } = useExpenses();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    const path = generatePath(ROUTES.EXPENSE, { id });

    navigate(path);
  };

  return (
    <>
      {data ? (
        <Card elevation={2} sx={{ mt: 4 }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Amount</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.entries.map((entry) => (
                  <TableRow
                    hover
                    key={entry.id}
                    onClick={() => handleClick(entry.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="left">{entry.amount}</TableCell>
                    <TableCell align="left">{entry.name}</TableCell>
                    <TableCell align="left">{entry.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      ) : (
        <Box>There is no expenses yet. Add an expense</Box>
      )}

      <ExpenseControls />
    </>
  );
};
