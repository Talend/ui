import { Order } from './Sorter';
import TableHeader from '../TableHeader';
import TableActionHeader from '../TableActionHeader';

function getIcon(sortHandler, sorter) {
  if (sortHandler && sortHandler.isSorterActive && sortHandler.isSorterActive(sorter)) {
    switch (sorter.getOrder()) {
      case Order.ASCENDING:
        return 'talend-sort-asc';
      case Order.DESCENDING:
        return 'talend-sort-desc';
      default:
        return null;
    }
  }
  return null;
}

class InternalSorter {

  constructor(sorter, click) {
    this.sorter = sorter;
    this.click = click;
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.click(this.sorter);
  }

}

export default class SorterHeaderRenderer {

  constructor(sortHandler) {
    this.sortHandler = sortHandler;
    this.sorters = {};
    this.onClick = this.onClick.bind(this);
  }

  setHandler(sortHandler) {
    this.sortHandler = sortHandler;
  }

  onClick(sorter) {
    if (this.sortHandler && this.sortHandler.onSortChange) {
      this.sortHandler.onSortChange(sorter);
    }
  }

  registerSorter(sorter) {
    this.sorters[sorter.getKey()] = new InternalSorter(sorter, this.onClick);
  }

  hasSorter(columnKey) {
    return Boolean(this.sorters[columnKey]);
  }

  getSorter(columnKey) {
    return this.sorters[columnKey].sorter;
  }

  getHeaderComponent(columnKey) {
		if (this.hasSorter(columnKey)) {
      return TableActionHeader;
    }
    return TableHeader;
	}

	getExtraProps(columnKey) {
    if (this.hasSorter(columnKey)) {
      const sorter = this.getSorter(columnKey);
      const onClick = this.sorters[columnKey].onClick;
      return {
        actionProps: {
          label: sorter.getLabel(),
          icon: getIcon(this.sortHandler, sorter),
          onClick,
          iconPosition: 'right',
          link: true,
        },
      }
    }
		return null;
	}

}
