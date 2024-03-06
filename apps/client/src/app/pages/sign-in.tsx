import * as React from 'react';
import { FC } from 'react';

import { SignInForm } from '../components/forms';
import { ContentContainer } from '../components';

export const SignIn: FC = () => {
  return (
    <ContentContainer>
      <SignInForm />
    </ContentContainer>
  );
};
