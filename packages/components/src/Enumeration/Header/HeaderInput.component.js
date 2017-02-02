import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function HeaderInput({ headerInput, onAddChange, onAddKeyUp, valueAdded }) {
	const getAction = (action, index) => {
		const propsAction = {
			key: index,
			label: action.label,
			icon: action.icon,
			onClick: action.onClick && (
				event => action.onClick(event, { value: inputRef.value })
			),
			disabled: action.disabled,
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

	const onAddChangeHandler = (event) => {
		onAddChange(event, {
			value: event.target.value,
		});
	};

	const onAddKeyUpHandler = (event) => {
		onAddKeyUp(event, {
			value: event.target.value,
		});
	};

	let inputRef;

	return (
		<header className={headerClasses()}>
			<input
				type="text"
				placeholder="New entry"
				ref={input => (inputRef = input)}
				onChange={onAddChangeHandler}
				onKeyUp={onAddKeyUpHandler}
			/>
			{headerInput.map((action, index) => getAction(action, index))}
		</header>
	);
}

HeaderInput.propTypes = {};

export default HeaderInput;
