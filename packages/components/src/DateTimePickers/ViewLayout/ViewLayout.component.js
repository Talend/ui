import React from 'react';
import PropTypes from 'prop-types';
import theme from './ViewLayout.scss';

function ViewLayout(props) {
	const {
		leftNode,
		middleNode,
		rightNode,
	} = props.header;

	return (
		<div className={theme.container}>
			<div className={theme.header}>
				<div className={theme.left}>
					{leftNode}
				</div>
				<div className={theme.middle}>
					{middleNode}
				</div>
				<div className={theme.right}>
					{rightNode}
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
		leftNode: PropTypes.node,
		middleNode: PropTypes.node,
		rightNode: PropTypes.node,
	}).isRequired,
	bodyNode: PropTypes.node.isRequired,
};

export default ViewLayout;
