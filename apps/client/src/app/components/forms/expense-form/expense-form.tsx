import * as React from 'react';
import { FC } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { useCreateExpenseMutation } from '../../../store/services';
import { ROUTES } from '../../../constants';

const CreateExpenseFormSchema = Yup.object().shape({
  amount: Yup.number().positive().required(),
  name: Yup.string(),
  category: Yup.string().required(),
  expense_date: Yup.string().required(),
});

type FormValues = {
  amount: number;
  name?: string;
  category: string;
  expense_date: Dayjs;
};

export const ExpenseForm: FC = () => {
  const [createExpense] = useCreateExpenseMutation();
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      amount: 0,
      name: '',
      category: '',
      expense_date: dayjs(),
    },
    validationSchema: CreateExpenseFormSchema,
    onSubmit: async (values, formikHelpers) => {
      const requestData = {
        ...values,
        expense_date: values.expense_date as unknown as string,
      };

      try {
        const response = await createExpense(requestData);

        if ('data' in response) {
          navigate(ROUTES.HOME);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Add New Expense
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
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
            <TextField
              label="Category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Pick the date"
                  name="expense_date"
                  defaultValue={new Date()}
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
          fullWidth
        >
          Add Expense
        </Button>
      </Box>
    </Box>
  );
};
