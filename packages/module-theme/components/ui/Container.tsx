import { ReactNode } from 'react';

const Containers = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`mb-0 max-w-[90rem] px-6 -3xs:max-w-none mx-auto ${className}`}
    >
      {children}
    </div>
  );
};
export default Containers;
