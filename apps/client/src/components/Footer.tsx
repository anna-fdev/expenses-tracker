import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../assets/createTheme';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Expenses
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Toolbar disableGutters>
            <AccountBalanceWalletIcon
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                color: 'white',
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              EXPENSES
            </Typography>
          </Toolbar>
          <Typography>
            <Copyright />
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
