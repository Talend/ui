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
			<div className={theme.body}>
				{props.bodyNode}
			</div>
		</div>
	);
}

ViewLayout.propTypes = {
	header: PropTypes.shape(ViewHeader.propTypes).isRequired,
	bodyNode: PropTypes.node.isRequired,
};

export default ViewLayout;
