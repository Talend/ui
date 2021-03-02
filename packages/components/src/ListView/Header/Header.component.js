import React from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

import Action from '../../Actions/Action';
import theme from './Header.scss';

import headerPropTypes from './Header.propTypes';

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

function Header({ headerDefault, headerLabel, nbItemsSelected, nbItems, required, t }) {
	function renderTitle() {
		const computedHeaderLabel =
			headerLabel || t('LISTVIEW_HEADER_TITLE', { defaultValue: 'Values' });
		return (
			<strong>
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

Header.propTypes = headerPropTypes;

Header.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(Header);
