import RegexpFilter from './RegexpFilter';
import BooleanFilter from './BooleanFilter';
import StringFilterComponent from './StringFilterComponent';
import ToggleFilterComponent from './ToggleFilterComponent';

/**
 * A factory of filters.
 * Provides two methods in order to create two kinds of filters:
 * - a filter based on a regular expression
 * - a filter based on a boolean parameter
 * Each method returns an object with:
 * - a filter (cannot be null)
 * - a renderer (cannot be null)
 * - a classname (optional)
 * - extra props for the corresponding renderer
 */
export default {
	/**
	 * Create a filter and its renderer based on regular expression.
	 */
	createRegexpFilter(id, key, strict, className, rendererProps) {
		const filter = new RegexpFilter(id, key, false, strict);
		return {
			filter,
			renderer: StringFilterComponent,
			className,
			rendererProps,
		};
	},
	/**
	 *
	 */
	createBooleanFilter(id, key, reverse, className, rendererProps) {
		const filter = new BooleanFilter(id, key, false, reverse);
		return {
			filter,
			renderer: ToggleFilterComponent,
			className,
			rendererProps,
		};
	},
};
