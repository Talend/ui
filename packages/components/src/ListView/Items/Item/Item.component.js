import React from 'react';
import classNames from 'classnames';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';
import { Button } from 'react-bootstrap';
import { Icon } from '../../../index';

function itemLabelClasses() {
	return classNames(theme['tc-listview-item-label'], 'tc-listview-item-label');
}

function Item(props) {
	const { id, item, parentItem, isSwitchBox, searchCriteria } = props;

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
	const itemSelector = classNames('checkbox', { 'switch-nested': props.children }, { 'switch': isSwitchBox });

	return (
		<div id={id}>
			<div className="checkbox-container">
				<div className={itemSelector} key={item.index}>
					<label htmlFor={itemId}>
						<input
							id={itemId}
							type="checkbox"
							checked={item.checked}
							onChange={event => parentItem ? item.onChange(event, item, parentItem) : item.onChange(event, item)}
						/>
						<span className={itemLabelClasses()}>
							{searchCriteria ? getSearchedLabel(item.label) : item.label}
						</span>
					</label>
					{ props.children && (
						<div className={classNames('checkbox-nested-expand', { expanded: item.expanded })}>
							<Button
								bsStyle="link"
								onClick={event => item.onExpandToggle(event, item)}
							>
								<Icon name="talend-caret-down" />
							</Button>
						</div>
					)}
					{ props.children && item.expanded && (
						<div className="checkbox-nested">
							{props.children}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

Item.propTypes = ItemPropTypes;

export default Item;
