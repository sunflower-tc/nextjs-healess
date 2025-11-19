import { Combobox, Dialog, Transition } from '@headlessui/react';
import { Trans, t } from '@lingui/macro';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from './Link';

type dataType = {
  urlkey: string;
};

type filterDatatype = {
  urlkey: string;
};

const top10products: any = [
  { urlkey: 'Top' },
  { urlkey: 'Mens' },
  { urlkey: 'Shoes' },
  { urlkey: 'Mats' },
  { urlkey: 'Gear' },
  { urlkey: 'women' },
  { urlkey: 'yoga' },
  { urlkey: 'jackets' },
  { urlkey: 'watches' },
  { urlkey: 'fitness-equipment' },
];

export function SearchPopOver({
  open,
  handleSearch,
}: {
  open: boolean;
  handleSearch: () => void;
}) {
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();

  const searchHandler = (data: FieldValues) => {
    router.push({
      pathname: '/catalogsearch/result',
      query: { search: data.search },
    });
    handleSearch();
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState<SearchOptionType | null>(null);
  const handleKeyDown = (event: any) => {
    if (event.key == 'Escape') {
      handleSearch();
    }
  };

  const watchFields = watch();

  const filteredText = top10products.filter((product: filterDatatype) => {
    return product?.urlkey
      .toLowerCase()
      .includes(watchFields.search?.toLowerCase());
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleSearch}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={handleKeyDown}
      >
        <Transition.Root
          show={open}
          as={Fragment}
          afterLeave={() => setQuery(null)}
        >
          <Dialog
            as="div"
            className="fixed inset-0 z-[99999] overflow-y-auto hiddenScrollBar p-4 mt-3 sm:p-6 md:p-20"
            onClose={handleSearch}
            onKeyDown={handleKeyDown}
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
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Combobox
                as="div"
                className="max-w-xl mx-auto overflow-hidden transition-all transform bg-white divide-y divide-gray-100 shadow-2xl hiddenScrollBar rounded-xl ring-1 ring-black ring-opacity-5"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onChange={(person) => (window.location = top10products?.title)}
              >
                <form onSubmit={handleSubmit(searchHandler)}>
                  <label
                    aria-label="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      autoComplete="off"
                      {...register('search', { required: true })}
                      className="block w-full outline-none  p-4 pl-10 text-sm text-gray-900 border-none hover:border-b-[3px] rounded-lg bg-gray-50 dark:placeholder-gray-400"
                      placeholder={t`Search Product...`}
                    />

                    <button
                      type="reset"
                      className="absolute right-2.5 bg-slate-200 text-slate-900 hover:bg-slate-300 bottom-2.5 rounded-full focus:ring-4 border-none focus:outline-none cursor-pointer focus:ring-blue-300 font-medium text-[10px] px-3 py-2 "
                      onClick={handleSearch}
                    >
                      <Trans> ESC</Trans>
                    </button>
                  </div>
                </form>
                {filteredText.length > 0 && (
                  <Combobox.Options
                    static
                    className="py-2 overflow-y-auto text-sm text-gray-800 list-none hiddenScrollBar max-h-72 scroll-py-2"
                  >
                    {filteredText.map((product: dataType, index: number) => (
                      <Link
                        className="no-underline"
                        key={index}
                        onClick={() => handleSearch()}
                        href={`/catalogsearch/result?search=${product.urlkey}`}
                      >
                        <li className="px-2 py-2 text-lg font-semibold cursor-pointer select hover:bg-emerald-50 hover:text-brand">
                          {product.urlkey}
                        </li>
                      </Link>
                    ))}
                  </Combobox.Options>
                )}

                {watchFields.search !== '' && filteredText.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">
                    <Trans>Search</Trans> {watchFields.search}
                  </p>
                )}
              </Combobox>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </Modal>
    </div>
  );
}
interface SearchOptionType {
  inputValue?: string;
  title: string;
}
