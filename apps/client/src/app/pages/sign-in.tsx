import * as React from 'react';
import { FC } from 'react';
import { Container } from '@mui/material';

import { SignInForm } from '../components/forms';

export const SignIn: FC = () => {
  // TODO redirect authorized user to `home page`

  return (
    <Container component="main" maxWidth="xs">
      <SignInForm />
    </Container>
  );
};
