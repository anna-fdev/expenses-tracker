import { AUTH_TOKEN } from '../../../constants';
import { listenerMiddleware } from '../listener-middleware';
import { resetAuthToken, selectSystem, setLogInState } from '../../slices';
import { AppState } from '../../store';

listenerMiddleware.startListening({
  actionCreator: resetAuthToken,
  effect: (_, listenerApi) => {
    localStorage.removeItem(AUTH_TOKEN);

    const state = listenerApi.getState();
    const system = selectSystem(state as AppState);

    if (system.logInState === 'init') {
      listenerApi.dispatch(setLogInState('done'));
    }
  },
});
