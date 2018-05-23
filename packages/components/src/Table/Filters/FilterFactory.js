import RegexpFilter from './RegexpFilter';
import BooleanFilter from './BooleanFilter';

export function createRegexpFilter(id, key, strict) {
	return new RegexpFilter(id, key, false, strict);
}

export function createBooleanFilter(id, key, reverse) {
	return new BooleanFilter(id, key, false, reverse);
}

const defaultFilterFactory = {
	createRegexpFilter,
	createBooleanFilter,
};

export default defaultFilterFactory;
