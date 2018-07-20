import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Actions } from '../Actions';

import theme from './RichTitle.scss';

export default function RichTitle(props) {
	return (
		<div className={classNames(theme.container, 'tc-rich-title')}>
			<h4 className={classNames(theme.title, 'tc-rich-title-text')} title={props.title}>
				{props.title}
			</h4>
			<Actions
				className={classNames(theme.actions, 'tc-rich-title-actions')}
				actions={props.right}
			/>
		</div>
	);
}

RichTitle.propTypes = {
	title: PropTypes.string.isRequired,
	right: PropTypes.array,
};
