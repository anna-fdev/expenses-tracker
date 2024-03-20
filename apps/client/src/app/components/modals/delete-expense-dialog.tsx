import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from '@mui/material';
import { FC } from 'react';

type DeleteExpenseProps = DialogProps & {
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteExpenseDialog: FC<DeleteExpenseProps> = ({
  content,
  onCancel,
  onConfirm,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">
          Cancel
        </Button>
        <Button autoFocus color="secondary" onClick={onConfirm}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
