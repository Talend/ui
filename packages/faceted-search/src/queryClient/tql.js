import { Query } from '@talend/daikon-tql-client';
import flow from 'lodash/flow';

const getBadgeQueryValues = ({ properties }) => [
	properties.attribute,
	properties.operator.name,
	properties.value,
];

const getBadgesQueryValues = badges => badges.map(getBadgeQueryValues);

const isNotEmptyOrNull = value => value && value.length;
const isObjectIdNotEmptyOrNull = value => isNotEmptyOrNull(value.id);

const filterBadgeWithNoValue = ({ properties }) => {
	if (Array.isArray(properties.value) && properties.value.length) {
		return properties.value.every(isObjectIdNotEmptyOrNull);
	}
	return isNotEmptyOrNull(properties.value);
};

const removeBadgesWithEmptyValue = badges => badges.filter(filterBadgeWithNoValue);

const prepareBadges = flow([removeBadgesWithEmptyValue, getBadgesQueryValues]);

/**
 * Accept an instance of the query class and return a dictionary.
 * Key is an operator and value is pointing to the corresponding instance class method.
 * @param {Query} query instance of Query class
 */
const getTqlClassOperatorsDictionary = query => ({
	contains: query.contains,
	'=': query.equal,
	in: query.in,
});

const formatValue = value => {
	if (Array.isArray(value)) {
		return value.map(val => val.id);
	}
	if (typeof value === 'string') {
		return value.trim();
	}
	return value;
};

/**
 * Evaluating the correct query method with the help of the dictionary and the operator.
 */
const fromBadgeToTql = badgesLength => (query, [category, operator, value], index) => {
	const queryFunction = getTqlClassOperatorsDictionary(query)[operator];
	const tqlQuery = queryFunction(category, formatValue(value));
	if (index === badgesLength - 1) {
		return tqlQuery;
	}
	return tqlQuery.and();
};

/**
 * Create a proper tql query either from a collection of badgesFacetedPropTypes or a string
 * @param {array[badgeFacetedPropTypes]} badges
 * @see '../components/facetedSearch.propTypes.js'
 */
const createTqlQuery = facetedQuery => {
	if (!facetedQuery || !facetedQuery.length) {
		return '';
	}
	if (Array.isArray(facetedQuery)) {
		const preparedBadges = prepareBadges(facetedQuery);
		return preparedBadges.reduce(fromBadgeToTql(preparedBadges.length), new Query()).serialize();
	}
	return formatValue(facetedQuery);
};

// eslint-disable-next-line import/prefer-default-export
export { createTqlQuery };
