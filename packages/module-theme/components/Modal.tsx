import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ErrorBoundary from './ErrorBoundary';
export default function Modal(props: any) {
  return (
    <ErrorBoundary>
      {' '}
      <Transition appear show={props.showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[999999]"
          onClose={() => props.hideModal()}
        >
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
            <div className="relative flex items-center justify-center min-h-full text-center sm:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`w-full min-h-screen overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:min-h-max md:max-w-2xl sm:rounded sm:px-6 sm:pb-6 ${props.panelClass}`}
                >
                  {props.title && (
                    <Dialog.Title
                      as="h3"
                      className={`flex items-center gap-6 text-lg font-semibold leading-6 text-gray-900 -sm:px-5 -sm:border-b -sm:border-solid -sm:border-0 -sm:pb-4 ${props.titleClass}`}
                    >
                      {props.title}
                    </Dialog.Title>
                  )}{' '}
                  {props.children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ErrorBoundary>
  );
}
