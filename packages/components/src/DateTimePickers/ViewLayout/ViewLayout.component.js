import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
				<div className={classNames(theme['node-container'], theme.left)}>
					{leftNode}
				</div>
				<div className={classNames(theme['node-container'], theme.middle)}>
					{middleNode}
				</div>
				<div className={classNames(theme['node-container'], theme.right)}>
					{rightNode}
				</div>
			</div>
			<div className={classNames(theme['node-container'], theme.body)}>
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
