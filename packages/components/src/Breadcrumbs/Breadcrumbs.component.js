import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import uuid from 'uuid';

import theme from './Breadcrumbs.scss';
import { ActionDropdown } from '../Actions';
import Icon from '../Icon';

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
function Breadcrumbs(props) {
	const items = props.items || [];

	const nbItems = items.length;
	const maxItemsToDisplay = props.maxItems || DEFAULT_MAX_ITEMS;
	const maxItemsReached = nbItems > maxItemsToDisplay;
	const ellipsisIndex = nbItems - 1 - maxItemsToDisplay;
	const hiddenItems = items.slice(0, ellipsisIndex + 1).map((hiddenItem, index) => ({
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
					<Button id={id} bsStyle="link" role="link" title={title} onClick={wrappedOnClick}>
						{text}
					</Button>
				);
			}
			return (
				<span id={id} title={title}>
					{text}
				</span>
			);
		}
		if (maxItemsReached && index < ellipsisIndex) {
			return (
				<li className="sr-only" key={index}>
					{getItemContent()}
				</li>
			);
		}
		if (maxItemsReached && index === ellipsisIndex) {
			return [
				<li className="sr-only" key={index + 0.1}>
					{getItemContent()}
				</li>,
				<li className={'tc-breadcrumb-menu'} key={index + 0.2} aria-hidden="true">
					<ActionDropdown id={`${props.id}-ellipsis`} items={hiddenItems} label="…" link noCaret />
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
		<ol id={props.id} className={classNames('breadcrumb', theme['tc-breadcrumb'], 'tc-breadcrumb')}>
			{items.map(renderBreadcrumbItem)}
		</ol>
	);
}

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			text: PropTypes.string.isRequired,
			title: PropTypes.string,
			onClick: PropTypes.func,
		}),
	),
	maxItems: PropTypes.number,
};

Breadcrumbs.defaultProps = {
	id: `${uuid.v4()}`,
};

export default Breadcrumbs;
