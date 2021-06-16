import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import Action from '../../Actions/Action';
import theme from './Header.scss';

let inputRef;

function headerClasses() {
	return classNames(theme['tc-listview-header'], 'tc-listview-header');
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
			key={`${index}-listview-header-action`}
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

function HeaderInput({ headerInput, onInputChange, inputPlaceholder, onAddKeyDown, t }) {
	const computedInputPlaceholder =
		inputPlaceholder || t('LISTVIEW_HEADERINPUT_SEARCH_PLACEHOLDER', { defaultValue: 'Search' });

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
		<header className={headerClasses()}>
			<input
				type="text"
				placeholder={computedInputPlaceholder}
				ref={input => {
					inputRef = input;
				}}
				onChange={onInputChangeHandler}
				onKeyDown={onAddKeyDownHandler}
				aria-label={computedInputPlaceholder}
				autoFocus
			/>
			{headerInput.map(getAction)}
		</header>
	);
}

HeaderInput.propTypes = {
	headerInput: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	onInputChange: PropTypes.func,
	inputPlaceholder: PropTypes.string,
	onAddKeyDown: PropTypes.func,
	t: PropTypes.func,
};

HeaderInput.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(HeaderInput);
