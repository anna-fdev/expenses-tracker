import { useGetUserMeDataQuery } from '../services';
import { AppState } from '../store';

import { useAppSelector } from './common';

export const useUserMe = () => {
  const { authToken } = useAppSelector((state: AppState) => state.system);

  const { data, error, isLoading } = useGetUserMeDataQuery(undefined, {
    skip: !authToken,
    selectFromResult: ({ data, error, isLoading }) => ({
      data,
      error,
      isLoading,
    }),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export const useUserLoggedIn = (): boolean => {
  const { data } = useUserMe();

  return Boolean(data);
};
