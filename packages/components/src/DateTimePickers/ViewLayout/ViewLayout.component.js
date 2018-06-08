import React from 'react';
import PropTypes from 'prop-types';
import ViewHeader from '../ViewHeader';
import theme from './ViewLayout.scss';

function ViewLayout(props) {
	return (
		<div className={theme.container}>
			<div className={theme.header}>
				<ViewHeader {...props.header} />
			</div>
			<div className={theme.view}>
				{props.viewComponent}
			</div>
		</div>
	);
}

ViewLayout.propTypes = {
	header: ViewHeader.propTypes,
	viewComponent: PropTypes.node,
};

export default ViewLayout;
