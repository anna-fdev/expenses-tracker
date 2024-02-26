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
          <Box>
            <Button
              component={Link}
              color="secondary"
              variant="contained"
              to={ROUTES.SIGN_UP}
              sx={{ mr: 2 }}
            >
              Sign Up
            </Button>

            <Button
              component={Link}
              color="secondary"
              variant="contained"
              to={ROUTES.SIGN_IN}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
