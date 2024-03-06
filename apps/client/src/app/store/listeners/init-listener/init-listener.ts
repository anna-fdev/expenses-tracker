import { AUTH_TOKEN } from '../../../constants';
import { initAppAction } from '../../actions';
import { listenerMiddleware } from '../listener-middleware';
import { setAuthToken, setLogInState } from '../../slices';

listenerMiddleware.startListening({
  actionCreator: initAppAction,
  effect: (_, listenerApi) => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      listenerApi.dispatch(setAuthToken(token));
    } else {
      listenerApi.dispatch(setLogInState('done'));
    }
  },
});
