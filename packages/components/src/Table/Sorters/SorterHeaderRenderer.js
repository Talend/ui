import { Order } from './Sorter';
import TableHeader from '../TableHeader';
import TableActionHeader from '../TableActionHeader';

function getIcon(sortHandler, sorter) {
  if (sortHandler.isSorterActive(sorter)) {
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

  constructor(sorter, parent) {
    this.sorter = sorter;
    this.parent = parent;
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.parent.onClick(this.sorter);
  }

}

export default class SorterHeaderRenderer {

  constructor(sortHandler) {
    this.sortHandler = sortHandler;
    this.sorters = {};
  }

  onClick(sorter) {
    this.sortHandler.onSortChange(sorter);
  }

  registerSorter(sorter) {
    this.sorters[sorter.getKey()] = new InternalSorter(sorter, this);
  }

  getHeaderComponent(columnKey) {
		if (this.sorters[columnKey]) {
      return TableActionHeader;
    }
    return TableHeader;
	}

	getExtraProps(columnKey) {
    if (this.sorters[columnKey]) {
      const sorter = this.sorters[columnKey].sorter;
      return {
        actionProps: {
          label: sorter.getLabel(),
          icon: getIcon(this.sortHandler, sorter),
          onClick: this.sorters[columnKey].onClick,
          iconPosition: 'right',
          link: true,
        },
      }
    }
		return null;
	}

}
