import React from 'react';
import PropTypes from 'prop-types';

import DefaultValueRenderer, { DEFAULT_VALUE_PROP_TYPES } from './DefaultValueRenderer.component';

export default function DefaultRenderer({ data }) {
	return <DefaultValueRenderer value={data.value} />;
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: DEFAULT_VALUE_PROP_TYPES,
	}),
};
