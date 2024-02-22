import { authToken } from '../../../constants';
import { listenerMiddleware } from '../listener-middleware';
import { resetAuthToken } from '../../slices';

listenerMiddleware.startListening({
  actionCreator: resetAuthToken,
  effect: (_, listenerApi) => {
    localStorage.removeItem(authToken);
  },
});
