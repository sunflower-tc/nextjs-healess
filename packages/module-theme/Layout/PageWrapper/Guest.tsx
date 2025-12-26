import { ReactNode } from 'react';

const Guest = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-870px)] h-max block items-start">
      {children}
    </div>
  );
};

export default Guest;
