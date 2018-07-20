import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import { translate } from 'react-i18next';

import theme from './Breadcrumbs.scss';
import { Action, ActionDropdown } from '../Actions';
import Icon from '../Icon';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

/**
 * Default max items to display without starting by ellipsis
 */
const DEFAULT_MAX_ITEMS = 3;

/**
 * Indicate the current page's location within a navigational hierarchy.
 * @param {object} props   react props
 * @example
 <Breadcrumbs
 maxItems={3}
 items={items}
 />
 */
export function BreadcrumbsComponent(props) {
	const nbItems = props.items.length;
	const maxItemsToDisplay = props.maxItems;
	const maxItemsReached = nbItems > maxItemsToDisplay;
	const ellipsisIndex = nbItems - 1 - maxItemsToDisplay;
	const hiddenItems = props.items.slice(0, ellipsisIndex + 1).map((hiddenItem, index) => ({
		id: `${props.id}-item-${index}`,
		label: hiddenItem.text,
		title: hiddenItem.title,
		onClick: event => hiddenItem.onClick(event, hiddenItem),
	}));
	/**
	 * Render breadcrumb item
	 * @param item Plain object representative of breadcrumb item
	 * @param index Item position
	 * @returns {*} Breadcrumb item rendering depending of its position
	 */
	function renderBreadcrumbItem(item, index) {
		const { text, title, onClick } = item;
		const isActive = index === nbItems - 1;
		const id = `${props.id}-item-${index}`;
		const separator = index < props.items.length - 1 && (
			<li
				className={classNames('tc-breadcrumb-separator', 'separator')}
				key={`${index}-separator`}
				aria-hidden="true"
			>
				<Icon name="talend-chevron-left" transform="rotate-180" />
			</li>
		);

		/**
		 * Wrapper for onClick in order to return item
		 * @param args Arguments of default onClick callback
		 * @returns {Function} New callback with the item
		 */
		let wrappedOnClick;
		if (onClick) {
			wrappedOnClick = event => onClick(event, item);
		}
		function getItemContent() {
			if (!isActive && onClick) {
				return (
					<Action
						id={id}
						bsStyle="link"
						role="link"
						title={title || text}
						aria-label={title}
						label={text}
						onClick={wrappedOnClick}
					/>
				);
			}
			const ariaCurrent = isActive ? 'page' : undefined;
			return (
				// bug in eslint a11y plugin, fixed in version 6.
				// But to upgrade we need to upgrade the whole package (eslint, airbnb, a11y, react)
				// eslint-disable-next-line jsx-a11y/aria-props
				<span id={id} title={title} aria-current={ariaCurrent}>
					{text}
				</span>
			);
		}
		if (maxItemsReached && index < ellipsisIndex) {
			return;
		}
		if (maxItemsReached && index === ellipsisIndex) {
			return [
				<li className="tc-breadcrumb-menu" key={index + 0.1}>
					<ActionDropdown
						id={`${props.id}-ellipsis`}
						items={hiddenItems}
						aria-label={props.t('BREADCRUMB_OPEN_FIRST_LINKS_MENU', {
							defaultValue: 'Open first links menu',
						})}
						label="…"
						link
						noCaret
					/>
				</li>,
				separator,
			];
		}
		return [
			<li className={classNames('tc-breadcrumb-item', { active: isActive })} key={index}>
				{getItemContent()}
			</li>,
			separator,
		];
	}

	return (
		<nav aria-label={props.t('BREADCRUMB', { defaultValue: 'breadcrumb' })}>
			<ol
				id={props.id}
				className={classNames('breadcrumb', theme['tc-breadcrumb'], 'tc-breadcrumb')}
			>
				{props.items.map(renderBreadcrumbItem)}
			</ol>
		</nav>
	);
}

BreadcrumbsComponent.displayName = 'Breadcrumbs';

BreadcrumbsComponent.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string.isRequired,
			title: PropTypes.string,
			onClick: PropTypes.func,
		}),
	),
	maxItems: PropTypes.number,
	t: PropTypes.func,
};

BreadcrumbsComponent.defaultProps = {
	id: `${uuid.v4()}`,
	items: [],
	maxItems: DEFAULT_MAX_ITEMS,
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(BreadcrumbsComponent);
