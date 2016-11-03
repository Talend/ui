import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import theme from './Breadcrumbs.scss';

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

	/**
	 * Render breadcrumb item
	 * @param item Plain object representative of breadcrumb item
	 * @param index Item position
	 * @returns {*} Breadcrumb item rendering depending of its position
	 */
	const renderBreadcrumbItem = (item, index) => {
		const { text, title, onClick } = item;
		const isActive = index === (nbItems - 1);

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
				<li className={classNames(theme.dots)} key={index}>
					{onClick ?
						<Button
							className="sr-only"
							bsStyle="link"
							role="link"
							title={title}
							onClick={wrappedOnClick}
						>{text}</Button> : <span className="sr-only">{text}</span>
					}
					<span aria-hidden="true">
						&hellip;
					</span>
				</li>
			);
		}
		return (
			<li className={isActive ? 'active' : ''} key={index}>
				{(!isActive && onClick) ?
					<Button
						bsStyle="link"
						role="link"
						title={title}
						onClick={wrappedOnClick}
					>{text}</Button> : <span>{text}</span>
				}
			</li>
		);
	};

	return (
		<ol className={classNames('breadcrumb', theme['tc-breadcrumb'], 'tc-breadcrumb')}>
			{items.map(renderBreadcrumbItem)}
		</ol>
	);
}

Breadcrumbs.propTypes = {
	items: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			text: React.PropTypes.string.isRequired,
			title: React.PropTypes.string,
			onClick: React.PropTypes.func,
		})
	),
	maxItems: React.PropTypes.number,
};

export default Breadcrumbs;
