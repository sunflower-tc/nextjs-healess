import CircularProgress from '@mui/material/CircularProgress';
import { Fragment, useRef, useState } from 'react';

export default function AdyenCardPayWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <CircularProgress className="mx-auto text-brand/80" color="primary" />
        </div>
      )}
      <div ref={containerRef} id='adyenpay-button-container' />
    </Fragment>)
}