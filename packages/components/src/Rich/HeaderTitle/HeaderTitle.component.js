import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './HeaderTitle.scss';

export default function HeaderTitle(props) {
	return (
		<div className={classNames(theme.container, 'tc-header-title')}>
			<h4 className={classNames(theme.title, 'tc-header-title-text')} title={props.title}>
				{props.title}
			</h4>
		</div>
	);
}

HeaderTitle.propTypes = {
	title: PropTypes.string.isRequired,
};
