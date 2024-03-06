import * as React from 'react';
import { FC } from 'react';

import { SignUpForm } from '../components/forms';
import { ContentContainer } from '../components';

export const SignUp: FC = () => {
  return (
    <ContentContainer>
      <SignUpForm />
    </ContentContainer>
  );
};
