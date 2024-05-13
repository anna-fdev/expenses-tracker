import * as React from 'react';
import { FC } from 'react';
import {
  Box,
  Card,
  IconButton,
  Skeleton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  DeleteOutlined,
  EditOutlined,
} from '@mui/icons-material';

import { useAppSelector, useExpenses } from '../../store/hooks';
import { selectSelectedDate } from '../../store/slices';
import { Pie } from '../pie/pie';
import { ExpensesSkeleton } from '../skeletons/expenses-skeleton';

import { ExpenseControls } from './expense-controls';
import { useExpenseList } from './use-expense-list';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

export const ExpenseList: FC = () => {
  const selectedDate = useAppSelector(selectSelectedDate);
  const { data, isLoading } = useExpenses();

  const {
    handleMonthNavigate,
    handleDeleteClick,
    handleEditClick,
    disableForwardMonthButton,
  } = useExpenseList();

  const isLoadingAndNoData = isLoading && !data;

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          width: '100%',
        }}
      >
        <IconButton
          color="secondary"
          aria-label="navigate back month"
          onClick={handleMonthNavigate('decrement')}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          component="h1"
          sx={(theme) => ({ fontSize: theme.spacing(3), textAlign: 'center' })}
        >
          {new Date(selectedDate).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </Typography>
        <IconButton
          color="secondary"
          aria-label="navigate forward month"
          onClick={handleMonthNavigate('increment')}
          disabled={disableForwardMonthButton()}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {isLoadingAndNoData && (
        <>
          <Skeleton
            variant="circular"
            width={240}
            height={240}
            sx={{ mt: 4 }}
          />
          <ExpensesSkeleton />
        </>
      )}

      {data?.entries.length === 0 ? (
        <Typography sx={{ mt: 4 }}>
          There are no expenses yet. Add new expense
        </Typography>
      ) : (
        <>
          <Pie />
          <Card elevation={2} sx={{ mt: 4, width: '100%' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead
                  sx={{
                    '& th': {
                      backgroundColor: (theme) => theme.palette.grey.A200,
                    },
                  }}
                >
                  <TableRow>
                    <StyledTableCell align="left">Amount</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Category</StyledTableCell>
                    <StyledTableCell align="right">Edit/Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.entries.map((entry) => (
                    <TableRow hover key={entry.id}>
                      <TableCell align="left">{entry.amount}</TableCell>
                      <TableCell align="left">{entry.name}</TableCell>
                      <TableCell align="left">{entry.category}</TableCell>
                      <TableCell align="right">
                        <EditOutlined
                          onClick={() => handleEditClick(entry.id)}
                          color="secondary"
                          fontSize="medium"
                          sx={{ cursor: 'pointer' }}
                        />
                        <DeleteOutlined
                          onClick={() => handleDeleteClick(entry.id)}
                          color="secondary"
                          fontSize="medium"
                          sx={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </>
      )}

      <ExpenseControls />
    </Box>
  );
};
