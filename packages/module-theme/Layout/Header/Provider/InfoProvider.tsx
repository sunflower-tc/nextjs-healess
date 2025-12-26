import { useCachedQuery } from '@packages/module-customer/hooks/useCachedFetch';
import GET_WISHLIST from '@voguish/module-customer/graphql/Wishlist.graphql';
import { useCustomerQuery } from '@voguish/module-customer/hooks/useCustomerQuery';
import MEGA_MENU_QUERY from '@voguish/module-theme/graphql/MegaMenu.graphql';
import { useSession } from 'next-auth/react';
import { createContext, FC, ReactNode, useContext } from 'react';
import { MegaMenuQueryResult } from '../Megamenu/types';
// to reduce api fetch for cms blocks
interface InfoContextType {
  data?: MegaMenuQueryResult;
  loading: boolean;
  wishlistData: any;
  wishListLoading: boolean;
  wishListRefetch: any;
  error?: Error;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading } = useCachedQuery<MegaMenuQueryResult>({
    query: MEGA_MENU_QUERY,
    cacheKey: 'MEGA_MENU',
    cacheHours: 2,
  });
  const { status } = useSession();

  // Conditionally execute the GraphQL query based on session status
  const {
    data: wishlistData,
    loading: wishListLoading,
    refetch: wishListRefetch,
  } = useCustomerQuery(GET_WISHLIST, {
    skip: status !== 'authenticated', // Skip the query if the user is not authenticated
  });
  return (
    <InfoContext.Provider
      value={{
        data: data as any,
        loading,
        wishlistData,
        wishListLoading,
        wishListRefetch,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = (): InfoContextType => {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error('useInfo must be used within a InfoProvider');
  }
  return context;
};
