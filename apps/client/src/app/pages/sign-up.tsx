import * as React from 'react';
import { FC } from 'react';
import { Container } from '@mui/material';

import { SignUpForm } from '../components/forms';

export const SignUp: FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <SignUpForm />
    </Container>
  );
};
