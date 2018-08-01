import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from './ViewLayout.scss';

function ViewLayout(props) {
	const { leftElement, middleElement, rightElement } = props.header;

	return (
		<div className={theme.container}>
			<div className={theme.header}>
				<div className={classNames(theme['element-container'], theme.left)}>{leftElement}</div>
				<div className={classNames(theme['element-container'], theme.middle)}>{middleElement}</div>
				<div className={classNames(theme['element-container'], theme.right)}>{rightElement}</div>
			</div>
			<div className={classNames(theme['element-container'], theme.body)}>{props.bodyElement}</div>
		</div>
	);
}

ViewLayout.propTypes = {
	header: PropTypes.shape({
		leftElement: PropTypes.element,
		middleElement: PropTypes.element,
		rightElement: PropTypes.element,
	}).isRequired,
	bodyElement: PropTypes.element.isRequired,
};

export default ViewLayout;
