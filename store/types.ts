import { ReactNode } from 'react';

export interface UserInterface {
  email: string | null | undefined;
  name: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  token: string | null | undefined;
  compareList: { data: CompareList | null };
  compareId: { compareId: string | number };
  isGuest: { isGuest: boolean };
}
export interface ErrorsStatic {
  graphQLErrors: {
    extensions: { category: string };
    message: string;
  }[];
  networkError: { message: string };
  message: string;
}
export interface CompareAtttributes {
  code: string;
  label: string;
}
export interface CompareItem {
  uid: string | number;
  product: CompareProduct[];
}
export interface CompareProduct {
  id: string | number;
  sku: string;
  name: string;
}
export interface CompareList {
  uid: string | number;
  item_count: number;
  attributes: CompareAtttributes[];
  items: CompareItem[];
}
export type ToastConfig = {
  autoHideDuration?: number;
  autoHide?: boolean;
  direction?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transition?: 'left' | 'right' | 'up' | 'down';
};

export type ToastProviderProps = {
  toast: Toast[];
  toastConfig: ToastConfig;
};

export type Toast = {
  message: string;
  id?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  action?: ReactNode;
  autoHideDuration?: number;
};
