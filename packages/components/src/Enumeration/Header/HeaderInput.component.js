import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

let inputRef;

function headerClasses(addInputError) {
	return classNames({
		[theme['tc-enumeration-header']]: true,
		'tc-enumeration-header': true,
		'has-error': addInputError ? true : false,
	});
}

function headerErrorClasses() {
	return classNames({
		[theme['tc-enumeration-header-error']]: true,
		'tc-enumeration-header-error': true,
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

function HeaderInput({ headerInput, addInputError, onAddChange, onAddKeyDown }) {
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
		<header className={headerClasses(addInputError)}>
			<input
				type="text"
				placeholder="New entry"
				ref={(input) => { inputRef = input; }}
				onChange={onAddChangeHandler}
				onKeyDown={onAddKeyDownHandler}
				autoFocus
			/>
			{ addInputError ? <div className={headerErrorClasses()}>{addInputError}</div> : null}
			{headerInput.map((action, index) => getAction(action, index))}
		</header>
	);
}

HeaderInput.propTypes = {
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	addInputError: PropTypes.string,
	onAddChange: PropTypes.func,
	onAddKeyDown: PropTypes.func,
};

export default HeaderInput;
