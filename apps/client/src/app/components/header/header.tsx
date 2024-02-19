import * as React from 'react';
import { FC } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';

import { ROUTES } from '../../constants';

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <Box
            component={Link}
            to={ROUTES.HOME}
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'secondary.main',
            }}
          >
            <AccountBalanceWalletIcon sx={{ display: 'flex', mr: 1 }} />
            <Typography
              noWrap
              variant="h6"
              sx={{
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
              }}
            >
              EXPENSES
            </Typography>
          </Box>

          <Button
            component={Link}
            color="secondary"
            variant="contained"
            to={ROUTES.SIGN_UP}
          >
            Sign Up
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
