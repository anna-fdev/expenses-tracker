import * as React from 'react';
import { FC, useState } from 'react';
import {
  Box,
  Card,
  IconButton,
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
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  ArrowForward,
  DeleteOutlined,
  EditOutlined,
} from '@mui/icons-material';
import { useModal } from 'mui-modal-provider';

import { useAppDispatch, useExpenses } from '../../store/hooks';
import { ROUTES } from '../../constants';
import { DeleteExpenseDialog } from '../modals/delete-expense-dialog';
import { useDeleteExpenseMutation } from '../../store/services';
import { showSnackbar } from '../../store/slices';

import { ExpenseControls } from './expense-controls';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}));

export const ExpenseList: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data } = useExpenses(selectedDate);
  const navigate = useNavigate();
  const { showModal } = useModal();
  const [deleteExpense] = useDeleteExpenseMutation();
  const dispatch = useAppDispatch();

  const handleMonthNavigate =
    (navigateDirection: 'decrement' | 'increment') => () => {
      const monthValue = navigateDirection === 'increment' ? 1 : -1;

      setSelectedDate(
        new Date(selectedDate.setMonth(selectedDate.getMonth() + monthValue))
      );
    };

  const handleEditClick = (id: string) => {
    const path = generatePath(ROUTES.EXPENSE, { id });

    navigate(path);
  };

  const handleDeleteClick = async (id: string) => {
    const modal = showModal(DeleteExpenseDialog, {
      content: 'Are you sure you want to delete the expense',
      onConfirm: async () => {
        await deleteExpense(id);

        modal.hide();

        dispatch(
          showSnackbar({
            message: 'Expense was successfully deleted!',
            severity: 'success',
          })
        );
      },
      onCancel: () => {
        modal.hide();
      },
    });
  };

  const disableForwardMonthButton = (): boolean => {
    return (
      new Date().toLocaleDateString() === selectedDate.toLocaleDateString()
    );
  };

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
      {data ? (
        <>
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
              sx={{ fontSize: '1.5rem', textAlign: 'center' }}
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
                  {data.entries.map((entry) => (
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
      ) : (
        <Box>There is no expenses yet. Add an expense</Box>
      )}

      <ExpenseControls />
    </Box>
  );
};
