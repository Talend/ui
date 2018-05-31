import React from 'react';
import PropTypes from 'prop-types';

import DefaultValueRenderer from './DefaultValueRenderer';
import FormatValue, { REG_EXP_HAS_WHITE_SPACE_CHARACTERS } from './FormatValue.component';

export default function DefaultRenderer({ data }) {
	const HIDDEN_CHARACTERS_REG_EXP = new RegExp(REG_EXP_HAS_WHITE_SPACE_CHARACTERS);
	const hiddenCharsRegExpMatch = data.value.match(HIDDEN_CHARACTERS_REG_EXP);

	if (!hiddenCharsRegExpMatch[1] && !hiddenCharsRegExpMatch[2]) {
		return <DefaultValueRenderer label={data.value} />;
	}

	return <DefaultValueRenderer contentRenderer={() => <FormatValue value={data.value} />} />;
}

DefaultRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
