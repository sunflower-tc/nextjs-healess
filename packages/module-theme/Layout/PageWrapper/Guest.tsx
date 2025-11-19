import { useCreateEmptyCartForGuest } from '@voguish/module-quote/hooks/cart-handler';
import React from 'react';

const Guest = ({ children }: { children: React.ReactNode }) => {
  useCreateEmptyCartForGuest();
  return (
    <div className="min-h-[calc(100vh-638px)] h-max block items-start">
      {children}
    </div>
  );
};

export default Guest;
