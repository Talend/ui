import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import Action from '../../Actions/Action';
import theme from './Header.scss';
import I18N_DOMAIN_COMPONENTS from '../../constants';

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
	inputPlaceholder,
	onAddKeyDown,
	value,
	inputRef,
	t,
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

	return (
		<header className={headerClasses(headerError)}>
			<input
				type="text"
				aria-label={t('TC_ENUMERATION_SEARCH', { defaultValue: 'Enter search term' })}
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
			{headerError && <div className={headerErrorClasses()}>{headerError}</div>}
			{headerInput.map((action, index) => getAction(action, index, getInternalInputRef.bind(this)))}
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
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS)(HeaderInput);
