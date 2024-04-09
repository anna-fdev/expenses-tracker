import { listenerMiddleware } from '../listener-middleware';
import { setSelectedDate } from '../../slices';

listenerMiddleware.startListening({
  actionCreator: setSelectedDate,
  effect: (_, listenerApi) => {
    // TODO figure out how to handle resetting the api state
    // listenerApi.dispatch(commonApi.util.invalidateTags([ExpenseTag]));
    // listenerApi.dispatch(
    //   commonApi.util.updateQueryData('getExpenses', {}, (draft) => {
    //     draft.entries = [];
    //
    //     return draft;
    //   })
    // );
  },
});
