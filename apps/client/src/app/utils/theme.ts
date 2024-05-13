import { createTheme } from '@mui/material/styles';

import {
  COLOR_INFO_MAIN,
  COLOR_PRIMARY_MAIN,
  COLOR_SECONDARY_MAIN,
} from '../constants';

export const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY_MAIN,
    },
    secondary: {
      main: COLOR_SECONDARY_MAIN,
    },
    info: {
      main: COLOR_INFO_MAIN,
    },
  },
});
