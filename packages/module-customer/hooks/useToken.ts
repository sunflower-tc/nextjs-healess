import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export const useToken = () => {
  const { data: session, status } = useSession();
  const token = useSelector((state: RootState) => state?.user?.token);
  const isLoading = status === 'loading';
  if (isLoading) return null;
  return session?.user?.token || token || null;
};
