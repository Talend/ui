import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';

const badgeDefinitionRawDataPropTypes = PropTypes.shape({
	attribute: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	operators: PropTypes.arrayOf(PropTypes.string),
	type: PropTypes.string.isRequired,
	metadata: PropTypes.shape({
		badgePerFacet: PropTypes.string,
		entitiesPerBadge: PropTypes.string,
	}),
});

const badgesDefinitionsRawDataPropTypes = PropTypes.arrayOf(badgeDefinitionRawDataPropTypes);

const operatorPropTypes = PropTypes.shape({
	name: PropTypes.string,
	label: PropTypes.string,
	iconName: PropTypes.string,
	color: PropTypes.oneOf(Object.values(Badge.COLORS)),
});

const operatorsPropTypes = PropTypes.arrayOf(operatorPropTypes);

const badgeFacetedPropTypes = PropTypes.shape({
	properties: PropTypes.shape({
		attribute: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		initialOperatorOpened: PropTypes.bool,
		initialValueOpened: PropTypes.bool,
		operator: operatorPropTypes,
		operators: operatorsPropTypes,
		type: PropTypes.string.isRequired,
	}),
	metadata: PropTypes.shape({
		badgeId: PropTypes.string,
		badgePerFacet: PropTypes.string,
		isInCreation: PropTypes.bool,
		entitiesPerBadge: PropTypes.string,
		operators: PropTypes.arrayOf(PropTypes.string),
	}),
});

const badgesFacetedPropTypes = PropTypes.arrayOf(badgeFacetedPropTypes);

const callbacksPropTypes = PropTypes.shape({
	getTags: PropTypes.func,
});

export {
	badgeDefinitionRawDataPropTypes,
	badgesDefinitionsRawDataPropTypes,
	badgeFacetedPropTypes,
	badgesFacetedPropTypes,
	operatorPropTypes,
	operatorsPropTypes,
	callbacksPropTypes,
};
