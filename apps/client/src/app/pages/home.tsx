import React from 'react';
import Container from '@mui/material/Container';

import { useUserMe } from '../store/hooks';

export const Home = () => {
  const { data: userMeData } = useUserMe();

  return (
    <Container maxWidth="lg">{userMeData && <>{userMeData.email}</>}</Container>
  );
};
