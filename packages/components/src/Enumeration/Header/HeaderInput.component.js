import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function HeaderInput({props}) {
	return (
		<header className={headerClasses()}>
			<input type="text" placeholder="New entry"/>
			{props.map((action, index) => (
				<Action
					key={index}
					label={action.label}
					icon={action.icon}
					onClick={action.onClick}
					tooltipPlacement="bottom"
					disabled={action.disabled}
					hideLabel
					link
				/>
			))}
		</header>
	);
}

HeaderInput.propTypes = {};

export default HeaderInput;
