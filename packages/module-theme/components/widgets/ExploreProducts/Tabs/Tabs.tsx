import ErrorBoundary from '@voguish/module-theme/components/ErrorBoundary';
import { FC, ReactNode } from 'react';
import styles from './Tabs.module.css';

type Props = {
  children: ReactNode;
};
const Tabs: FC<Props> = ({ children }) => {
  return <div className={`${styles.tabs}`}>{children}</div>;
};

export default Tabs;

type TabListData = {
  id: number;
  tabName: string;
  title: string;
  formId: string;
  defaultActiveTab: number;
  switchHandler: {
    // eslint-disable-next-line no-unused-vars
    (id: number): void;
  };
};
/**
 * Tab Lists - Tab Items
 *
 * @param {*} param0
 * id: Id of that tab ||
 * className - className to manage css for the same from your component ||
 * tabName - As this is input it needs a name attribute - it should be same for all tab list in a tab group ||
 * title - Title of that tab list
 * defaultActiveTab - to set selected on load
 * switchHandler - to Manage the switch tab
 * @returns
 */
export const TabList: FC<TabListData> = ({
  id,
  tabName,
  title,
  formId,
  defaultActiveTab = false,
  switchHandler,
}) => {
  const isChecked = defaultActiveTab === id;
  return (
    <ErrorBoundary>
      <div className={styles.tab__list} id={`#${id}`}>
        <input
          type="radio"
          defaultChecked={isChecked}
          onChange={() => {
            switchHandler(id);
          }}
          id={formId}
          className={`${styles.tabs}`}
          name={tabName}
        />
        <label className="text-bold" htmlFor={formId}>
          {title}
        </label>
        <div className={`${styles.ease} ${styles.line}`}></div>
      </div>
    </ErrorBoundary>
  );
};
