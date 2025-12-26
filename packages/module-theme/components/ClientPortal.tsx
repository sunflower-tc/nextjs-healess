import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ErrorBoundary from './ErrorBoundary';

type ClientPortalInterface = {
  children: ReactNode;
  selector: string;
};

export const ClientPortal = ({ children, selector }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setIsMounted(true);
  }, [selector]);

  return isMounted && ref.current
    ? createPortal(<ErrorBoundary>{children}</ErrorBoundary>, ref.current)
    : null;
};
