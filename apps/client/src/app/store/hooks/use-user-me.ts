import { useSelector } from 'react-redux';

import { useGetUserMeDataQuery } from '../services';
import { selectSystem } from '../slices';

export const useUserMe = () => {
  const { authToken } = useSelector(selectSystem);

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
