import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function Header({props}) {
	return (
		<header className={headerClasses()}>
			<span>Values</span>
			{props.map((action, index) => (
				<Action
					key={index}
					label={action.label}
					icon={action.icon}
					onClick={action.onClick}
					tooltipPlacement="bottom"
					hideLabel
					link
				/>
		))}
		</header>
	);
}

Header.propTypes = {};

export default Header;
