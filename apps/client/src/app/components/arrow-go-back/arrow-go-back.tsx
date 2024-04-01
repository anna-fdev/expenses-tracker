import * as React from 'react';
import { FC } from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const ArrowGoBack: FC = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      color="secondary"
      aria-label="navigate back to home"
      sx={{ left: 0, top: 36 }}
      onClick={() => navigate(-1)}
    >
      <ArrowBack />
    </IconButton>
  );
};
