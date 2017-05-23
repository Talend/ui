import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

let inputRef;

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
			inProgress={action.inProgress}
			hideLabel
			link
		/>
	);
}

function HeaderInput({ headerInput, headerError, onInputChange, inputPlaceholder, onAddKeyDown, value }) {
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
					inputRef = input;
				}}
				onChange={onInputChangeHandler}
				onKeyDown={onAddKeyDownHandler}
				value={value}
				autoFocus
			/>
			{ headerError &&
			<div className={headerErrorClasses()}>{headerError}</div> }
			{headerInput.map((action, index) => getAction(action, index))}
		</header>
	);
}

HeaderInput.propTypes = {
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerError: PropTypes.string,
	onInputChange: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	onAddKeyDown: PropTypes.func,
	value: PropTypes.string,
};

export default HeaderInput;
