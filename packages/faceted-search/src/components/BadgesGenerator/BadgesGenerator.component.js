import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { badgesFacetedPropTypes } from '../facetedSearch.propTypes';
import { pick } from 'lodash';

const BadgesGenerator = ({ badges, badgesDictionary, getBadgeFromDict, callbacks, t }) =>
	badges.reduce((acc, { properties, metadata }) => {
		const BadgeComponent = getBadgeFromDict(badgesDictionary, get(properties, 'type'));
		const dataAttributesKeys = Object.keys(metadata).filter(objectKey =>
			objectKey.startsWith('data-'),
		);
		const dataAttributes = pick(metadata, dataAttributesKeys);
		if (BadgeComponent) {
			acc.push(
				<BadgeComponent
					{...metadata}
					{...properties}
					dataAttributes={dataAttributes}
					callbacks={callbacks}
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
	badgesDictionary: PropTypes.object.isRequired,
	getBadgeFromDict: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgesGenerator };
