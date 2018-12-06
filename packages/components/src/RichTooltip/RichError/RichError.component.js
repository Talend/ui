import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../Icon';

import theme from './RichError.scss';

export default function RichError(props) {
	return (
		<div className={classNames(theme.wrapper, 'tc-rich-error')}>
			<Icon name="talend-warning" className={classNames(theme.icon, 'tc-rich-error-icon')} />
			<div className={classNames(theme.content, 'tc-rich-error-content')}>
				<h4>{props.title}</h4>
				<div>{props.error}</div>
			</div>
		</div>
	);
}

RichError.propTypes = {
	title: PropTypes.string,
	error: PropTypes.string,
};
