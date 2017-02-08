import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

const headerClasses = () => classNames({
	[theme['tc-enumeration-header']]: true,
	'tc-enumeration-header': true,
});

function HeaderInput({ headerInput, onAddChange, onAddKeyDown, valueAdded }) {
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

	const onAddKeyDownHandler = (event) => {
		onAddKeyDown(event, {
			value: event.target.value,
		});
	};

	let inputRef;

	return (
		<header className={headerClasses()}>
			<input
				type="text"
				placeholder="New entry"
				ref={(input) => {
					inputRef = input;
				}}
				onChange={onAddChangeHandler}
				onKeyDown={onAddKeyDownHandler}
				autoFocus
			/>
			{headerInput.map((action, index) => getAction(action, index))}
		</header>
	);
}

HeaderInput.propTypes = {};

export default HeaderInput;
