import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';

const BadgesGenerator = ({ badges, badgesDictionary, getBadgeFromDict, t }) =>
	badges.reduce((acc, { properties, metadata }) => {
		const BadgeComponent = getBadgeFromDict(badgesDictionary, get(properties, 'type'));
		if (BadgeComponent) {
			acc.push(
				<BadgeComponent
					{...properties}
					{...metadata}
					id={metadata.badgeId}
					key={metadata.badgeId}
					t={t}
				/>,
			);
		}
		return acc;
	}, []);

BadgesGenerator.propTypes = {
	badges: badgesFacetedPropTypes,
	getBadgeFromDict: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	onHideOperator: PropTypes.func,
	onSubmit: PropTypes.func,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgesGenerator };
