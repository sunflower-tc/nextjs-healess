import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useToken = () => {
  return useSelector((state: RootState) => state.user?.token);
};
