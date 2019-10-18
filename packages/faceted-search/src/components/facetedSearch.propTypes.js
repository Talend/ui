import PropTypes from 'prop-types';

const badgeDefinitionRawDataPropTypes = PropTypes.shape({
	attribute: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	operators: PropTypes.arrayOf(PropTypes.string),
	type: PropTypes.string.isRequired,
	metadata: PropTypes.shape({
		badges_per_facet: PropTypes.string,
		entities_per_badge: PropTypes.string,
	}),
});

const badgesDefinitionsRawDataPropTypes = PropTypes.arrayOf(badgeDefinitionRawDataPropTypes);

const operatorPropTypes = PropTypes.shape({
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	iconName: PropTypes.string.isRequired,
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
		badgeId: PropTypes.string.isRequired,
		badgesPerFacet: PropTypes.string,
		case: PropTypes.string,
		entitiesPerBadge: PropTypes.string,
		operators: PropTypes.arrayOf(PropTypes.string),
	}),
});

const badgesFacetedPropTypes = PropTypes.arrayOf(badgeFacetedPropTypes);

export {
	badgeDefinitionRawDataPropTypes,
	badgesDefinitionsRawDataPropTypes,
	badgeFacetedPropTypes,
	badgesFacetedPropTypes,
	operatorPropTypes,
	operatorsPropTypes,
};
