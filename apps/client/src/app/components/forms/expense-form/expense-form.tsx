import * as React from 'react';
import { FC } from 'react';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { ApiExpense } from '@expenses-tracker/api-models';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LoadingButton } from '@mui/lab';
import { CategoryEnum } from '@expenses-tracker/models';

import { ROUTES } from '../../../constants';
import {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
} from '../../../store/services';
import { categoryListMap } from '../../../utils/ui-helpers';

const ExpenseFormSchema = Yup.object().shape({
  amount: Yup.number().positive().required(),
  name: Yup.string(),
  category: Yup.string().required(),
  expense_date: Yup.string().required(),
});

type FormValues = {
  amount: number;
  name?: string;
  category: string;
  expense_date: Dayjs | string;
};

type ExpenseFormProps = {
  existedExpense?: ApiExpense;
};

const initialValues = {
  amount: 0,
  name: '',
  category: '',
  expense_date: dayjs(),
};

export const ExpenseForm: FC<ExpenseFormProps> = ({ existedExpense }) => {
  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      ...(existedExpense ? existedExpense : initialValues),
      expense_date: existedExpense
        ? dayjs(existedExpense.expense_date)
        : dayjs(),
    },
    validationSchema: ExpenseFormSchema,
    onSubmit: async (values, formikHelpers) => {
      const requestData = {
        ...values,
        expense_date: values.expense_date as string,
      };

      try {
        let response;

        if (existedExpense) {
          response = await updateExpense({
            ...requestData,
            id: existedExpense.id,
          });
        } else {
          response = await createExpense(requestData);
        }

        if ('data' in response) {
          navigate(ROUTES.HOME);
        }
      } catch (error) {
        console.error(error);
      }
    },
    enableReinitialize: Boolean(existedExpense),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 'sm',
        marginTop: 4,
        marginRight: 'auto',
        marginLeft: 'auto',
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              name="amount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Title"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                id="category"
                label="Category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                fullWidth
                sx={{
                  '.MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  },
                }}
              >
                {Object.keys(categoryListMap).map((key) => (
                  <MenuItem key={key} value={key} sx={{ gap: 1 }}>
                    {categoryListMap[key as CategoryEnum].icon}
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Pick the date"
                  name="expense_date"
                  value={formik.values.expense_date}
                  onChange={(value: unknown) => {
                    formik.setFieldValue(
                      'expense_date',
                      (value as Date).toISOString()
                    );
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          loading={formik.isSubmitting}
          disabled={!formik.dirty}
        >
          {existedExpense ? 'Update' : 'Create'} Expense
        </LoadingButton>
      </Box>
    </Box>
  );
};
