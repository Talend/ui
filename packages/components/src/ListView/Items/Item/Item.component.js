import React from 'react';
import classNames from 'classnames';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

function itemLabelClasses() {
	return classNames(theme['tc-listview-item-label'], 'tc-listview-item-label');
}

function Item(props) {
	const { id, item, isSwitchBox, searchCriteria } = props;

	/**
	 * This function allow to get component rendering based on searchCriteria
	 * @param label the current label to parse & to render
	 */
	function getSearchedLabel(label) {
		const splitRegex = new RegExp(`(${searchCriteria})`, 'gi');
		return label.split(splitRegex).map((part, index) => {
			const higlighted = part.toLowerCase() === searchCriteria.toLowerCase() ? <b>{part}</b> : part;
			return <span key={index}>{higlighted}</span>;
		});
	}

	const itemId = id && `checkbox-${id}`;
	const itemSelector = isSwitchBox ? 'switch checkbox' : 'checkbox';

	return (
		<div id={id}>
			<div className="checkbox-container">
				<div className={itemSelector} key={item.index}>
					<label htmlFor={itemId}>
						<input
							id={itemId}
							type="checkbox"
							checked={item.checked}
							onChange={event => item.onChange(event, item)}
						/>
						<span className={itemLabelClasses()}>
							{searchCriteria ? getSearchedLabel(item.label) : item.label}
						</span>
					</label>
				</div>
			</div>
		</div>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
