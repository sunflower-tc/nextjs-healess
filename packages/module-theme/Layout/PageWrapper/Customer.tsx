import { useCustomerCart } from '@voguish/module-quote/hooks';
import React from 'react';
const Customer = ({ children }: { children: React.ReactNode }) => {
  useCustomerCart();

  return (
    <div className="min-h-[calc(100vh-638px)] h-max block items-start">
      {children}
    </div>
  );
};

export default Customer;
