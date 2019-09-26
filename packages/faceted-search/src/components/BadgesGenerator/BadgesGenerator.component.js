import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';

const BadgesGenerator = ({ badges, getBadge, t }) =>
	badges.reduce((acc, { properties, metadata }) => {
		const BadgeComponent = getBadge(get(properties, 'type'));
		if (BadgeComponent) {
			acc.push(
				<BadgeComponent {...properties} id={metadata.badgeId} key={metadata.badgeId} t={t} />,
			);
		}
		return acc;
	}, []);

BadgesGenerator.propTypes = {
	badges: badgesFacetedPropTypes,
	getBadge: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	onHideOperator: PropTypes.func,
	onSubmit: PropTypes.func,
	t: PropTypes.func.isRequired,
};

export { BadgesGenerator };
