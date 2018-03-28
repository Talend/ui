import { ID as NameFilterId } from './NameFilter';
import NameFilterComponent from './NameFilterComponent';
import { ID as MandatoryFieldFilterId } from './MandatoryFieldFilter';
import MandatoryFieldFilterComponent from './MandatoryFieldFilterComponent';
/**
 * This class provides filter components.
 */
export default class FilterComponents {
	/**
	 * Returns the component used to display the given filter.
	 */
	get(filterKey) {
		switch (filterKey) {
			case NameFilterId:
				return NameFilterComponent;
			case MandatoryFieldFilterId:
				return MandatoryFieldFilterComponent;
			default:
				return null;
		}
	}
}
