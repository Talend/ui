import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import { withTranslation } from 'react-i18next';

import theme from './Breadcrumbs.scss';
import { Action, ActionDropdown } from '../Actions';
import Skeleton from '../Skeleton/Skeleton.component';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

/**
 * Default max items to display
 * @type {number}
 */
const DEFAULT_MAX_ITEMS = 4;

/**
 * Default number of items before adding an ellipsis
 * @type {number}
 */
const DEFAULT_NB_ITEMS_BEFORE_ELLIPSIS = 1;

const BREADCRUMB_SKELETON = [
	{ type: Skeleton.TYPES.text, size: Skeleton.SIZES.large },
	{ type: Skeleton.TYPES.circle, size: Skeleton.SIZES.small },
	{ type: Skeleton.TYPES.text, size: Skeleton.SIZES.large },
];

/**
 * Indicate the current page location within a navigational hierarchy.
 * @param {object} props   react props
 * @example
 <Breadcrumbs
 maxItems={4}
 items={items}
 />
 */
export function BreadcrumbsComponent({ loading, id, items, maxItems, t }) {
	if (loading) {
		return (
			<div
				className={classNames(
					theme['tc-breadcrumb'],
					theme.loading,
					'tc-breadcrumb',
					'tc-breadcrumb--loading',
				)}
			>
				{BREADCRUMB_SKELETON.map(({ size, type }, index) => (
					<Skeleton key={index} size={size} type={type} />
				))}
			</div>
		);
	}
	const nbItems = items.length;
	const maxItemsReached = nbItems > maxItems;
	const ellipsisIndex = nbItems - maxItems + DEFAULT_NB_ITEMS_BEFORE_ELLIPSIS;
	const hiddenItems = items
		.slice(DEFAULT_NB_ITEMS_BEFORE_ELLIPSIS, ellipsisIndex + 1)
		.map((hiddenItem, index) => ({
			id: `${id}-item-${index + DEFAULT_NB_ITEMS_BEFORE_ELLIPSIS}`,
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
		const itemId = `${id}-item-${index}`;

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
						id={itemId}
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
				<span id={itemId} title={title} aria-current={ariaCurrent}>
					{text}
				</span>
			);
		}
		if (maxItemsReached && index > 0 && index < ellipsisIndex) {
			return undefined;
		}
		if (maxItemsReached && index === ellipsisIndex) {
			return (
				<li className="tc-breadcrumb-menu" key={index + 0.1}>
					<ActionDropdown
						id={`${id}-ellipsis`}
						items={hiddenItems}
						aria-label={t('BREADCRUMB_OPEN_FIRST_LINKS_MENU', {
							defaultValue: 'Open first links menu',
						})}
						label="…"
						link
						noCaret
					/>
				</li>
			);
		}
		return (
			<li className={classNames('tc-breadcrumb-item', { active: isActive })} key={index}>
				{getItemContent()}
			</li>
		);
	}

	return (
		<nav aria-label={t('BREADCRUMB', { defaultValue: 'breadcrumb' })}>
			<ul id={id} className={classNames('breadcrumb', theme['tc-breadcrumb'], 'tc-breadcrumb')}>
				{items.map(renderBreadcrumbItem)}
			</ul>
		</nav>
	);
}

BreadcrumbsComponent.displayName = 'Breadcrumbs';

if (process.env.NODE_ENV !== 'production') {
	BreadcrumbsComponent.propTypes = {
		id: PropTypes.string,
		loading: PropTypes.bool,
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
}

BreadcrumbsComponent.defaultProps = {
	id: uuid.v4(),
	items: [],
	maxItems: DEFAULT_MAX_ITEMS,
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(BreadcrumbsComponent);
