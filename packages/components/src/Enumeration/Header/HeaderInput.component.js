import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Action from '../../Actions/Action';
import theme from './Header.scss';

function headerClasses(headerError) {
	return classNames(theme['tc-enumeration-header'], 'tc-enumeration-header', {
		'has-error': !!headerError,
	});
}

function headerErrorClasses() {
	return classNames(theme['tc-enumeration-header-error'], 'tc-enumeration-header-error');
}

function getAction(action, index, getInternalInputRef) {
	function onClick(event) {
		const internalInputRef = getInternalInputRef();
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
	headerInput,
	headerError,
	onInputChange,
	id,
	inputLabel,
	inputPlaceholder,
	onAddKeyDown,
	value,
	inputRef,
}) {
	let internalInputRef = null;

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

	function getInternalInputRef() {
		return internalInputRef;
	}

	const errorId = `${id}_error`;
	return (
		<header className={headerClasses(headerError)}>
			<input
				type="text"
				aria-label={inputLabel}
				aria-describedby={errorId}
				id={id}
				placeholder={inputPlaceholder}
				ref={input => {
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
			{headerError && (
				<div id={errorId} className={headerErrorClasses()} aria-live="assertive">
					{headerError}
				</div>
			)}
			{headerInput
				.filter(action => !action.disabled)
				.map((action, index) => getAction(action, index, getInternalInputRef.bind(this)))}
		</header>
	);
}

HeaderInput.propTypes = {
	id: PropTypes.string.isRequired,
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerError: PropTypes.string,
	onInputChange: PropTypes.func,
	inputLabel: PropTypes.string,
	inputPlaceholder: PropTypes.string,
	inputRef: PropTypes.func,
	onAddKeyDown: PropTypes.func,
	value: PropTypes.string,
};

export default HeaderInput;
