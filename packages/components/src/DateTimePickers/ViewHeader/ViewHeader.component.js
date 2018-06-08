import React from 'react';
import PropTypes from 'prop-types';
import theme from './ViewHeader.scss';

function ViewHeader(props) {
	return (
		<div className={theme.container}>
			<div className={theme.left}>
				{props.leftItem}
			</div>
			<div className={theme.middle}>
				{props.middleItem}
			</div>
			<div className={theme.right}>
				{props.rightItem}
			</div>
		</div>
	);
}

ViewHeader.propTypes = {
	leftItem: PropTypes.node,
	middleItem: PropTypes.node,
	rightItem: PropTypes.node,
};

export default ViewHeader;
