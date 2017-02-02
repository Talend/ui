import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function Header({ headerDefault }) {
	const getAction = (action, index) => {
		const propsAction = {
			key: index,
			label: action.label,
			icon: action.icon,
			onClick: action.onClick && (event => action.onClick(event, { value: event.target.value })),
		};

		return (
			<Action
				{...propsAction}
				tooltipPlacement="bottom"
				hideLabel
				link
			/>
		);
	};
	return (
		<header className={headerClasses()}>
			<span>Values</span>
			{headerDefault.map((action, index) => getAction(action, index))}
		</header>
	);
}

Header.propTypes = {};

export default Header;
