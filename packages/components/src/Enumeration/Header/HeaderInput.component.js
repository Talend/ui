import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

function headerClasses(headerError) {
	return classNames({
		[theme['tc-enumeration-header']]: true,
		'tc-enumeration-header': true,
		'has-error': !!headerError,
	});
}

function headerErrorClasses() {
	return classNames({
		[theme['tc-enumeration-header-error']]: true,
		'tc-enumeration-header-error': true,
	});
}

function getAction(action, index, internalInputRef) {
	function onClick(event) {
		if (action.onClick) {
			action.onClick(event, {
				value: internalInputRef.value,
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
			inProgress={action.inProgress}
			hideLabel
			link
		/>
	);
}

function HeaderInput({
	headerInput, headerError, onInputChange, inputPlaceholder,
	onAddKeyDown, value, inputRef,
}) {
	let internalInputRef;

	function onInputChangeHandler(event) {
		onInputChange(event, {
			value: event.target.value,
		});
	}

	function onAddKeyDownHandler(event) {
		onAddKeyDown(event, {
			value: event.target.value,
		});
	}

	return (
		<header className={headerClasses(headerError)}>
			<input
				type="text"
				placeholder={inputPlaceholder}
				ref={(input) => {
					internalInputRef = input;
					if (inputRef) {
						inputRef(input);
					}
				}}
				onChange={onInputChangeHandler}
				onKeyDown={onAddKeyDownHandler}
				value={value}
				autoFocus
			/>
			{ headerError &&
			<div className={headerErrorClasses()}>{headerError}</div> }
			{headerInput.map((action, index) => getAction(action, index, internalInputRef))}
		</header>
	);
}

HeaderInput.propTypes = {
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerError: PropTypes.string,
	onInputChange: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	inputRef: PropTypes.func,
	onAddKeyDown: PropTypes.func,
	value: PropTypes.string,
};

export default HeaderInput;
