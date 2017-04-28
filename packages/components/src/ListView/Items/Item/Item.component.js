import React from 'react';
import classNames from 'classnames';
import { removeDuplicates, allIndexOf } from './utils';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';

function itemLabelClasses() {
	return classNames({
		[theme['tc-listview-item-label']]: true,
		'tc-listview-item-label': true,
	});
}

function Item(props) {
	const { id, item, searchCriteria } = props;
	/**
	 * This function allow to get component rendering based on searchCriteria
	 * @param label the current label to parse & to render
	 */
	function getSearchedLabel(label) {
		let indexes = allIndexOf(label.toLowerCase(), searchCriteria.toLowerCase());
		indexes = removeDuplicates(indexes, searchCriteria);
		return (<span>
			{/* Set the label to go on the first index if the index is not 0 */}
			{indexes[0] !== 0 ? label.substring(0, indexes[0]) : null}
			{indexes.map((matchIndex, index, matchIndexes) =>
				(
					<span key={index}>
						{/* get the string from label with indexes ( to keep words case ) */}
						<strong>{label.substring(matchIndex, matchIndex + searchCriteria.length)}</strong>
						{/* get the string before next index if there is */}
						{index === matchIndex.length + 1 ? null :
							label.substring(matchIndex + searchCriteria.length, matchIndexes[index + 1])
						}
					</span>
				))
			}
		</span>);
	}

	const itemId = `checkbox-${id}`;

	return (
		<li id={id}>
			<div className="checkbox-container">
				<div
					className="checkbox"
					key={item.index}
				>
					<label htmlFor={itemId}>
						<input
							id={itemId}
							type="checkbox"
							checked={item.checked}
							onChange={event => item.onChange(item, event)}
						/>
						<span className={itemLabelClasses()}>
							{searchCriteria ? getSearchedLabel(item.label) : item.label}
						</span>
					</label>
				</div>
			</div>
		</li>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
