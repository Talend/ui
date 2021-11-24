import { Query } from '@talend/daikon-tql-client';
import isEmpty from 'lodash/isEmpty';
import flow from 'lodash/flow';
import { operatorNames } from '../dictionary/operator.dictionary';

const getBadgeQueryValues = ({ properties }) => [
	properties.attribute,
	properties.operator.name,
	properties.value,
];

const getBadgesQueryValues = badges => badges.map(getBadgeQueryValues);

const isValidValue = value => {
	if (typeof value === 'string') {
		return !isEmpty(value);
	}
	return !Number.isNaN(value);
};

const keepValidValues = ({ properties }) => {
	if (Array.isArray(properties.value)) {
		return properties.value.length && properties.value.every(({ id }) => isValidValue(id));
	}
	return isValidValue(properties.value);
};

const removeBadgesWithEmptyValue = badges => badges.filter(keepValidValues);

const prepareBadges = flow([removeBadgesWithEmptyValue, getBadgesQueryValues]);

/**
 * Accept an instance of the query class and return a dictionary.
 * Key is an operator and value is pointing to the corresponding instance class method.
 * @param {Query} query instance of Query class
 */
const getTqlClassOperatorsDictionary = query => ({
	[operatorNames.contains]: query.contains,
	[operatorNames.containsIgnoreCase]: query.containsIgnoreCase,
	[operatorNames.equals]: query.equal,
	[operatorNames.in]: query.in,
	[operatorNames.notEquals]: query.unequal,
	[operatorNames.greaterThan]: query.greaterThan,
	[operatorNames.greaterThanOrEquals]: query.greaterThanOrEqual,
	[operatorNames.lessThan]: query.lessThan,
	[operatorNames.lessThanOrEquals]: query.lessThanOrEqual,
	[operatorNames.complies]: query.complies,
	[operatorNames.wordComplies]: query.wordComplies,
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
