import { FC, Fragment, ReactNode } from 'react';
import styles from './Tabs.module.css';

type TabContentData = {
  tabListId: number;
  children: ReactNode | boolean;
  activeTab: number;
};
/**
 * Tab Content - Content respective to selected tab.
 *
 * @param {*} param0
 *
 * tabListId - Id of respective TabList ||
 * className - className to manage css for the same from your component ||
 * children - innerHtml
 * activeTab - State of currently Active TabList
 * @returns
 */
export const TabContent: FC<TabContentData> = ({
  tabListId,
  children,
  activeTab,
}) => {
  if (activeTab === tabListId) {
    return (
      <Fragment>
        <section className={`${styles.tab__content}`}>{children}</section>
      </Fragment>
    );
  } else {
    return null;
  }
};
export default TabContent;
