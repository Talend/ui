import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function HeaderSelected({ headerSelected, selectedItems }) {
	const getAction = (action, index) => {
		const onClick = action.onClick && (
				event => action.onClick(event)
			);

		return (
			<Action
				key={`${index}-enum-header-action`}
				label={action.label}
				icon={action.icon}
				onClick={onClick}
				disabled={action.disabled}
				tooltipPlacement="bottom"
				hideLabel
				link
			/>
		);
	};

	const nbValuesSelected = selectedItems.length;
	let txtHeader = `${nbValuesSelected} selected value`;
	txtHeader = nbValuesSelected > 1 ? `${txtHeader}s` : txtHeader;

	return (
		<header className={headerClasses()}>
			<span>{txtHeader}</span>
			{selectedItems.length > 1 && headerSelected.map((action, index) => getAction(action, index))}
		</header>
	);
}

HeaderSelected.propTypes = {
	headerSelected: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	selectedItems: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default HeaderSelected;
