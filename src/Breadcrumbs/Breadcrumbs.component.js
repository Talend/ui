import React from 'react';
import { themr } from 'react-css-themr';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { BREADCRUMBS } from '../identifiers';

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
	const theme = props.theme || {};
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
			wrappedOnClick = (...args) => onClick(item, ...args);
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
      >{text}</Button> : text}
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
      >{text}</Button> :
	<span className="sr-only">{text}</span>}
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
     >{text}</Button> : text}
			</li>
		);
	};

	return (
		<ol className={classNames('breadcrumb', theme.breadcrumb)}>
			{items.map(renderBreadcrumbItem)}
		</ol>
	);
}

Breadcrumbs.propTypes = {
	theme: React.PropTypes.shape({
		breadcrumb: React.PropTypes.string,
		dots: React.PropTypes.string,
	}),
	items: React.PropTypes.arrayOf(
		React.PropTypes.shape({
			text: React.PropTypes.string.isRequired,
			title: React.PropTypes.string,
			onClick: React.PropTypes.func,
		})
	),
	maxItems: React.PropTypes.number,
};

export default themr(BREADCRUMBS)(Breadcrumbs);
export { Breadcrumbs as PureBreadcrumbs };
