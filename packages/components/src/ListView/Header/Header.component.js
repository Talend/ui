import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

import Action from '../../Actions/Action';
import theme from './Header.scss';

export function headerClasses() {
	return classNames(theme['tc-listview-header'], 'tc-listview-header');
}

function getAction(action, index) {
	function onClick(event) {
		if (action.onClick) {
			action.onClick(event, { value: event.target.value });
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

export function renderActions(headerDefault = []) {
	if (headerDefault.length) {
		return <div className="actions">{headerDefault.map(getAction)}</div>;
	}
	return null;
}

function Header({ headerDefault, headerLabel, labelProps, nbItemsSelected, nbItems, required, t }) {
	function renderTitle() {
		const computedHeaderLabel =
			headerLabel || t('LISTVIEW_HEADER_TITLE', { defaultValue: 'Values' });
		return (
			<strong {...labelProps}>
				{computedHeaderLabel}
				{required && '*'}
			</strong>
		);
	}

	function renderCount() {
		if (nbItems >= 1 && nbItemsSelected >= 1) {
			return (
				<small>
					(
					{t('LISTVIEW_HEADER_SELECTED', {
						count: nbItemsSelected,
						total: nbItems,
						defaultValue: '{{count}}/{{total}} selected',
					})}
					)
				</small>
			);
		}
		return null;
	}

	return (
		<header className={headerClasses()}>
			{renderTitle()}
			{renderCount()}
			{renderActions(headerDefault)}
		</header>
	);
}

Header.propTypes = {
	headerDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)).isRequired,
	headerLabel: PropTypes.string,
	labelProps: PropTypes.object,
	required: PropTypes.bool,
	nbItems: PropTypes.number,
	nbItemsSelected: PropTypes.number,
	t: PropTypes.func,
};

Header.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(Header);
