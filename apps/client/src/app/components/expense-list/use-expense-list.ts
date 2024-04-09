import { useModal } from 'mui-modal-provider';
import { generatePath, useNavigate } from 'react-router-dom';

import {
  selectSelectedDate,
  setSelectedDate,
  showSnackbar,
} from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DeleteExpenseDialog } from '../modals/delete-expense-dialog';
import { useDeleteExpenseMutation } from '../../store/services';
import { ROUTES } from '../../constants';

export const useExpenseList = () => {
  const navigate = useNavigate();
  const selectedDate = useAppSelector(selectSelectedDate);
  const dispatch = useAppDispatch();
  const { showModal } = useModal();
  const [deleteExpense] = useDeleteExpenseMutation();

  const handleMonthNavigate =
    (navigateDirection: 'decrement' | 'increment') => () => {
      const monthValue = navigateDirection === 'increment' ? 1 : -1;

      const newDate = new Date(
        selectedDate.setMonth(selectedDate.getMonth() + monthValue)
      );

      dispatch(setSelectedDate({ newSelectedDate: newDate }));
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

  const handleEditClick = (id: string) => {
    const path = generatePath(ROUTES.EXPENSE, { id });

    navigate(path);
  };

  const disableForwardMonthButton = (): boolean => {
    return (
      new Date().toLocaleDateString() === selectedDate.toLocaleDateString()
    );
  };

  return {
    handleMonthNavigate,
    handleDeleteClick,
    handleEditClick,
    disableForwardMonthButton,
  };
};
