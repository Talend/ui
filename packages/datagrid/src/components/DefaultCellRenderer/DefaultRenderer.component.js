import React from 'react';
import PropTypes from 'prop-types';

import DefaultValueRenderer from './DefaultValueRenderer.component';

export default function DefaultRenderer({ data }) {
	return <DefaultValueRenderer value={data.value} />;
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
