import * as React from 'react';
import { FC, PropsWithChildren } from 'react';
import { Container, SxProps } from '@mui/material';

type ContentContainerProps = {
  sx?: SxProps;
};

export const ContentContainer: FC<PropsWithChildren<ContentContainerProps>> = ({
  children,
  sx,
}) => {
  return (
    <Container component="main" sx={{ ...sx }}>
      {children}
    </Container>
  );
};
