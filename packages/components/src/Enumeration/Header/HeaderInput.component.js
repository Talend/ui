import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

let inputRef;

function headerClasses() {
	return classNames({
		[theme['tc-enumeration-header']]: true,
		'tc-enumeration-header': true,
	});
}


function getAction(action, index) {
	function onClick(event) {
		if (action.onClick) {
			action.onClick(event, {
				value: inputRef.value,
			});
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
			hideLabel
			link
		/>
	);
}

function HeaderInput({ headerInput, onAddChange, onAddKeyDown }) {
	function onAddChangeHandler(event) {
		onAddChange(event, {
			value: event.target.value,
		});
	}

	function onAddKeyDownHandler(event) {
		onAddKeyDown(event, {
			value: event.target.value,
		});
	}

	return (
		<header className={headerClasses()}>
			<input
				type="text"
				placeholder="New entry"
				ref={(input) => { inputRef = input; }}
				onChange={onAddChangeHandler}
				onKeyDown={onAddKeyDownHandler}
				autoFocus
			/>
			{headerInput.map((action, index) => getAction(action, index))}
		</header>
	);
}

HeaderInput.propTypes = {
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	onAddChange: PropTypes.func,
	onAddKeyDown: PropTypes.func,
};

export default HeaderInput;
