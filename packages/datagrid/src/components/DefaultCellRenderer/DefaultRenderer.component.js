import React from 'react';
import PropTypes from 'prop-types';

import DefaultValueRenderer from './DefaultValueRenderer.component';
import FormatValue, { hasWhiteSpaceCharacters } from './FormatValue.component';

export default function DefaultRenderer({ data }) {
	if (!hasWhiteSpaceCharacters(data.value)) {
		return <DefaultValueRenderer label={data.value} />;
	}

	return <DefaultValueRenderer contentRenderer={() => <FormatValue value={data.value} />} />;
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
