import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconSearch } from '@voguish/module-theme/components/elements/Icon';
import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { useState } from 'react';
import Search from './Product/Search';
export default function SearchDropdown() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <ErrorBoundary>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Search"
        className="relative w-8 h-8 p-0 bg-transparent border-none outline-none cursor-pointer group hover:text-brand focus:ring-primary/5"
      >
        <IconSearch hover="fill-black group-hover:fill-brand duration-150" />
      </button>{' '}
      {isOpen && (
        <ErrorBoundary>
          <div className="fixed inset-0 w-screen bg-white top-16" />
          <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <div className="absolute left-0 right-0 top-28">
              <Search />
            </div>
          </ClickAwayListener>
        </ErrorBoundary>
      )}
    </ErrorBoundary>
  );
}
