import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './FormatValue.scss';

export default function FormatValue(props) {
	const content = [];
	const value = props.value.replace(/\n/g, '↵\n');

	const HIDDEN_CHARACTERS_REG_EXP = /(^\s*)?([\s\S]*?)(\s*$)/;
	const hiddenCharsRegExpMatch = value.match(HIDDEN_CHARACTERS_REG_EXP);

	if (hiddenCharsRegExpMatch[1]) {
		content.push(
			<span className={classNames(theme['td-hidden-characters'], 'td-hidden-characters')}>
				{hiddenCharsRegExpMatch[1].replace(/\t/g, '    ')}
			</span>,
		);
	}

	content.push(<span>{hiddenCharsRegExpMatch[2]}</span>);

	if (hiddenCharsRegExpMatch[3]) {
		content.push(
			<span
				className={classNames(theme['td-hidden-characters'], 'td-hidden-characters', 'td-hidden')}
			>
				{hiddenCharsRegExpMatch[3].replace(/\t/g, '    ')}
			</span>,
		);
	}

	// return content;
	return <span>{content}</span>;
}
