import RegexpFilter from './RegexpFilter';
import BooleanFilter from './BooleanFilter';
import StringFilterComponent from './StringFilterComponent';
import ToggleFilterComponent from './ToggleFilterComponent';

export default {
	createRegexpFilter(id, key, strict, className, extra) {
		const filter = new RegexpFilter(id, key, false, strict);
		return {
			filter,
			renderer: StringFilterComponent,
			className,
			extra,
		};
	},
	createBooleanFilter(id, key, reverse, className, extra) {
		const filter = new BooleanFilter(id, key, false, reverse);
		return {
			filter,
			renderer: ToggleFilterComponent,
			className,
			extra,
		};
	},
};
