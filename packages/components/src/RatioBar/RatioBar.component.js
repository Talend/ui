import React from 'react';
import PropTypes from 'prop-types';
import { RatioBarComposition } from './RatioBarComposition.component';
import { EmptyLine, FilledLine } from './RatioBarLines.component';
import { getTheme } from '../theme';
import qualityBarTheme from './RatioBar.scss';

const theme = getTheme(qualityBarTheme);

export function RatioBar({ amount, total }) {
	return (
		<RatioBarComposition>
			<FilledLine percentage={(amount / total) * 100} value={amount} />
			<EmptyLine percentage={(1 - amount / total) * 100} value={total - amount} />
			<div className={theme('tc-ratio-bar-counter')}>
				{amount}/{total}
			</div>
		</RatioBarComposition>
	);
}

RatioBar.propTypes = {
	amount: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired,
};
