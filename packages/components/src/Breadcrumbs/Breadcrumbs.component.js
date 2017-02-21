import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import uuid from 'uuid';

import theme from './Breadcrumbs.scss';
import { ActionDropdown } from '../Actions';

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
	const ellipsisIndex = (nbItems - 1) - maxItemsToDisplay;
	const hiddenItems = items.slice(0, ellipsisIndex + 1)
		.map((hiddenItem, index) => (
			{
				id: `${props.id}-item-${index}`,
				label: hiddenItem.text,
				title: hiddenItem.title,
				onClick: event => hiddenItem.onClick(event, hiddenItem),
			}),
		);
	/**
	 * Render breadcrumb item
	 * @param item Plain object representative of breadcrumb item
	 * @param index Item position
	 * @returns {*} Breadcrumb item rendering depending of its position
	 */
	function renderBreadcrumbItem(item, index) {
		const { text, title, onClick } = item;
		const isActive = index === (nbItems - 1);
		const id = `${props.id}-item-${index}`;

		/**
		 * Wrapper for onClick in order to return item
		 * @param args Arguments of default onClick callback
		 * @returns {Function} New callback with the item
		 */
		let wrappedOnClick;
		if (onClick) {
			wrappedOnClick = event => onClick(event, item);
		}

		if (maxItemsReached && index < ellipsisIndex) {
			return (
				<li className="sr-only" key={index}>
					{onClick ?
						<Button
							id={id}
							bsStyle="link"
							role="link"
							title={title}
							onClick={wrappedOnClick}
						>{text}</Button> : <span>{text}</span>
					}
				</li>
			);
		}
		if (maxItemsReached && index === ellipsisIndex) {
			return (
				<li className={classNames(theme.dots)} key={index} aria-hidden="true">
					<ActionDropdown
						id={`${props.id}-ellipsis`}
						items={hiddenItems}
						label="&hellip;"
						link
						noCaret
					/>
				</li>
			);
		}
		return (
			<li className={isActive ? 'active' : ''} key={index}>
				{(!isActive && onClick) ?
					<Button
						id={id}
						bsStyle="link"
						role="link"
						title={title}
						onClick={wrappedOnClick}
					>{text}</Button> : <span id={id}>{text}</span>
				}
			</li>
		);
	}

	return (
		<ol id={props.id} className={classNames('breadcrumb', theme['tc-breadcrumb'], 'tc-breadcrumb')}>
			{items.map(renderBreadcrumbItem)}
		</ol>
	);
}

Breadcrumbs.propTypes = {
	id: React.PropTypes.string,
	items: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			text: React.PropTypes.string.isRequired,
			title: React.PropTypes.string,
			onClick: React.PropTypes.func,
		}),
	),
	maxItems: React.PropTypes.number,
};

Breadcrumbs.defaultProps = {
	id: `${uuid.v4()}`,
};

export default Breadcrumbs;
