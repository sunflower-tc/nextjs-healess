import { Dialog, Transition } from '@headlessui/react';
import { ElementType, FC, Fragment, ReactNode } from 'react';
import ErrorBoundary from '../../ErrorBoundary';
interface modalTypes {
  isOpen: boolean;
  children: ReactNode;
  title?: string | ReactNode;
  titleClass?: string;
  titleType?: ElementType;
  handClose: (value: boolean) => void;
}
const DialogModal: FC<modalTypes> = ({
  isOpen,
  children,
  title,
  titleClass,
  titleType = 'h3',
  handClose,
}) => {
  return (
    <ErrorBoundary>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={handClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title as={titleType} className={titleClass}>
                    {title}
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ErrorBoundary>
  );
};
export default DialogModal;
