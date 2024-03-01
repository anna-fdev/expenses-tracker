import { AUTH_TOKEN } from '../../../constants';
import { listenerMiddleware } from '../listener-middleware';
import { resetAuthToken } from '../../slices';

listenerMiddleware.startListening({
  actionCreator: resetAuthToken,
  effect: (_, listenerApi) => {
    localStorage.removeItem(AUTH_TOKEN);
  },
});
