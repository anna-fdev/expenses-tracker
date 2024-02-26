import { authToken } from '../../../constants';
import { initAppAction } from '../../actions';
import { listenerMiddleware } from '../listener-middleware';
import { setAuthToken } from '../../slices';

listenerMiddleware.startListening({
  actionCreator: initAppAction,
  effect: (_, listenerApi) => {
    const token = localStorage.getItem(authToken);

    if (token) {
      listenerApi.dispatch(setAuthToken(token));
    }
  },
});
