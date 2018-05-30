import React from 'react';
import PropTypes from 'prop-types';

import DefaultValueRenderer from './DefaultValueRenderer';
import FormatValue from './FormatValue.component';

export default function DefaultRenderer({ data }) {
	// todo show label is data.value is empty
	const HIDDEN_CHARACTERS_REG_EXP = /(^\s*)?([\s\S]*?)(\s*$)|\n/;
	const hiddenCharsRegExpMatch = data.value.match(HIDDEN_CHARACTERS_REG_EXP);

	if (!hiddenCharsRegExpMatch[1] && !hiddenCharsRegExpMatch[2]) {
		return <DefaultValueRenderer label={data.value} />;
	}

	return <DefaultValueRenderer renderContentTooltip={() => <FormatValue value={data.value} />} />;
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
