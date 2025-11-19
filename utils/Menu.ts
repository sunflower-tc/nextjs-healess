import {
  FormattedMenuItem,
  MenuItem,
} from '@voguish/module-theme/Layout/Header/Megamenu/types';
/**
 * Given an array of menu items, returns a copy of the array, sorted by their parent ID, then by their sort order (position)
 *
 * @param unsortedItems an array of items to be sorted
 * @returns {array} the sorted array
 * @namespace Util/Menu/getSortedItems
 */
export const getSortedItems = <T extends MenuItem | FormattedMenuItem>(
  unsortedItems: T[]
): T[] =>
  Array.from(unsortedItems).sort(
    (
      { parent_id: PID, position: P },
      { parent_id: prevPID, position: prevP }
    ) => PID - prevPID || P - prevP
  );

/** @namespace Util/Menu */
export class Menu {
  menu: Record<string, FormattedMenuItem> = {};

  menuPositionReference: Record<string, number[]> = {};

  getMenuUrl({
    url_key,
  }: Pick<MenuItem, 'url_key' | 'category_id' | 'display_mode'>): string {
    return url_key;
  }

  getMenuData({
    url_key,
    category_id,
    display_mode,
    ...item
  }: MenuItem): FormattedMenuItem {
    return {
      ...item,
      url_key: this.getMenuUrl({ url_key, category_id, display_mode }),
      children: {},
    };
  }

  setToValue(
    obj: Record<string, FormattedMenuItem>,
    path: string,
    value: FormattedMenuItem
  ): void {
    let i;

    const pathArray = path.split('.');

    let tmpObj: Record<string, any> = obj;

    for (i = 0; i < pathArray.length - 1; i++) {
      tmpObj = tmpObj[pathArray[i]];
    }

    tmpObj[pathArray[i]] = value;
  }

  createItem(data: MenuItem): void {
    const { parent_id, item_id } = data;

    if (parent_id === 0) {
      this.menuPositionReference[item_id] = [];
      this.menu[item_id] = this.getMenuData(data);
    } else if (this.menuPositionReference[parent_id] !== undefined) {
      this.menuPositionReference[item_id] = [
        ...this.menuPositionReference[parent_id],
        parent_id,
      ];

      this.setToValue(
        this.menu,
        `${this.menuPositionReference[item_id].join(
          '.children.'
        )}.children.${item_id}`,
        this.getMenuData(data)
      );
    }
  }

  reduce(unsortedItems: MenuItem[]): Record<string, FormattedMenuItem> {
    this.menu = {};
    this.menuPositionReference = {};

    getSortedItems(unsortedItems).forEach((realMenuItem) => {
      this.createItem(realMenuItem);
    });

    return this.menu;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Menu();
