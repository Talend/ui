import React from 'react';
import PropTypes from 'prop-types';
import theme from './ViewLayout.scss';

function ViewLayout(props) {
	const {
		leftItem,
		middleItem,
		rightItem,
	} = props.header;

	return (
		<div className={theme.container}>
			<div className={theme.header}>
				<div className={theme.left}>
					{leftItem}
				</div>
				<div className={theme.middle}>
					{middleItem}
				</div>
				<div className={theme.right}>
					{rightItem}
				</div>
			</div>
			<div className={theme.body}>
				{props.bodyNode}
			</div>
		</div>
	);
}

ViewLayout.propTypes = {
	header: PropTypes.shape({
		leftItem: PropTypes.node,
		middleItem: PropTypes.node,
		rightItem: PropTypes.node,
	}).isRequired,
	bodyNode: PropTypes.node.isRequired,
};

export default ViewLayout;
