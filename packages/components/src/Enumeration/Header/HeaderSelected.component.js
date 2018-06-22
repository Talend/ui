import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Action from '../../Actions/Action';
import theme from './Header.scss';

function headerClasses() {
	return classNames({
		[theme['tc-enumeration-header']]: true,
		'tc-enumeration-header': true,
	});
}

function getAction(action, index) {
	function onClick(event) {
		if (action.onClick) {
			action.onClick(event);
		}
	}
	return (
		<Action
			key={`${index}-enum-header-action`}
			label={action.label}
			icon={action.icon}
			onClick={onClick}
			disabled={action.disabled}
			tooltipPlacement="bottom"
			inProgress={action.inProgress}
			hideLabel
			link
		/>
	);
}

function HeaderSelected({ headerSelected, nbItemsSelected }) {
	let txtHeader = `${nbItemsSelected} selected value`;
	txtHeader = nbItemsSelected > 1 ? `${txtHeader}s` : txtHeader;

	return (
		<header className={headerClasses()}>
			<span>{txtHeader}</span>
			{headerSelected.filter(action => !action.disabled).map(getAction)}
		</header>
	);
}

HeaderSelected.propTypes = {
	headerSelected: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	nbItemsSelected: PropTypes.number,
};

export default HeaderSelected;
