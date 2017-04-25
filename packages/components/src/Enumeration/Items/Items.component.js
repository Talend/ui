import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';

import { DISPLAY_MODE_EDIT } from '../Enumeration.component';
import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';

function listClasses() {
	return classNames(
		theme['tc-list-items'],
		'tc-list-items',
	);
}

function itemsClasses() {
	return classNames(
		theme['tc-enumeration-items'],
		'tc-enumeration-items',
	);
}

function itemContainer(additionalClassName) {
	return classNames(
		theme['tc-item-container'],
		theme[additionalClassName],
		'tc-item-container',
		additionalClassName,
	);
}

const virtualizedListClassName = 'ReactVirtualized__List';

class Items extends React.PureComponent {
	constructor(props) {
		super(props);

		this.lazyLoadingTimer = null;
		this.renderItem = this.renderItem.bind(this);
		this.getRowHeight = this.getRowHeight.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
		this.scrollEnumeration = this.scrollEnumeration.bind(this);
		this.renderToggleAllOrItem = this.renderToggleAllOrItem.bind(this);
		this.renderToggleAll = this.renderToggleAll.bind(this);

		this.hasToggleAll = this.props.items.length > 1;
	}

	getRowHeight({ index }) {
		if (this.hasToggleAll && index === 0) {
			return 40;
		}
		const computedIndex = this.hasToggleAll ? index - 1 : index;
		const item = this.props.items[computedIndex];
		const isEditMode = item && item.displayMode === DISPLAY_MODE_EDIT;
		return this.props.itemsProp.getItemHeight(isEditMode);
	}

	getRowCount() {
		const { items } = this.props;
		return this.hasToggleAll ? items.length + 1 : items.length;
	}

	scrollEnumeration(event) {
		// needed because of React's event pooling
		event.persist();
		if (this.lazyLoadingTimer !== null) {
			clearTimeout(this.lazyLoadingTimer);
		}

		this.lazyLoadingTimer = setTimeout(() => {
			// react-virtualized fire scroll events not to be considered
			if (event.target.className.includes(virtualizedListClassName) &&
				event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
				this.props.itemsProp.onLoadData();
			}
		}, 500);
	}

	rowRenderer(props) {
		const {
			key,   // eslint-disable-line react/prop-types
			index, // eslint-disable-line react/prop-types
			style, // eslint-disable-line react/prop-types
		} = props;
		const isToggle = this.hasToggleAll && index === 0;
		return (
			<div className={itemContainer(isToggle && 'toggle')} key={key} style={style}>
				{this.renderToggleAllOrItem(index)}
			</div>
		);
	}

	renderToggleAllOrItem(index) {
		let computedIndex = index;

		if (this.hasToggleAll) {
			if (index === 0) {
				return this.renderToggleAll();
			}
			computedIndex = index - 1;
		}

		return this.renderItem(this.props.items[computedIndex], computedIndex);
	}

	renderToggleAll() {
		const { toggleAllLabel, toggleAllChecked, onToggleAll } = this.props;
		const toggleAllId = 'tc-enumeration-toggle-all';
		return (
			<div className="checkbox">
				<label htmlFor={toggleAllId}>
					<input
						id={toggleAllId}
						type="checkbox"
						onChange={onToggleAll}
						checked={!!toggleAllChecked}
					/>
					<strong>{toggleAllLabel}</strong>
				</label>
			</div>
		);
	}

	renderItem(item, index) {
		const computedIndex = this.hasToggleAll ? index + 1 : index;
		// affecting index to the item
		const itemWithIndex = {
			...item,
			index,
		};
		switch (item.displayMode) {
		case DISPLAY_MODE_EDIT: {
			const itemPropsEdit = {
				key: this.props.itemsProp.key,
				actions: this.props.itemsProp.actionsEdit,
				onSubmitItem: this.props.itemsProp.onSubmitItem,
				onAbortItem: this.props.itemsProp.onAbortItem,
				onChangeItem: this.props.itemsProp.onChangeItem,
			};
			itemWithIndex.itemProps = itemPropsEdit;

			return (
				<ItemEdit
					key={`${computedIndex}-item`}
					id={`${computedIndex}-item`}
					item={itemWithIndex}
					currentEdit={this.props.currentEdit}
				/>
			);
		}
		default: {
			const itemPropDefault = {
				key: this.props.itemsProp.key,
				actions: this.props.itemsProp.actionsDefault,
				onSelectItem: this.props.itemsProp.onSelectItem,
			};
			itemWithIndex.itemProps = itemPropDefault;
			return (
				<Item
					key={`${computedIndex}-item`}
					id={`${computedIndex}-item`}
					item={itemWithIndex}
					itemProps={itemPropDefault}
					searchCriteria={this.props.searchCriteria}
				/>
			);
		}
		}
	}

	render() {
		const actions = this.props.itemsProp && this.props.itemsProp.actionsDefault;
		if (this.getRowCount() === 0) {
			return (
				<div className={itemsClasses()}>
					<p>{this.props.emptyLabel}</p>
				</div>
			);
		}
		return (
			<ul className={itemsClasses()} onScroll={this.scrollEnumeration}>
				<AutoSizer>
					{({ height, width }) => (
						<List
							/**
							 * The props 'items' and 'actions' does not exist in <List>
							 * but only way to refresh component when items or actions change
							 * See https://github.com/bvaughn/react-virtualized/#pure-components
							 */
							items={this.props.items}
							actions={actions}
							className={listClasses()}
							rowRenderer={this.rowRenderer}
							width={width}
							height={height}
							rowCount={this.getRowCount()}
							rowHeight={this.getRowHeight}
						/>
					)}
				</AutoSizer>
			</ul>
		);
	}
}

Items.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		values: PropTypes.arrayOf(PropTypes.string),
	})),
	searchCriteria: PropTypes.string,
	itemsProp: PropTypes.shape({
		key: PropTypes.string.isRequired,
		getItemHeight: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.number,
		]),
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	toggleAllChecked: PropTypes.bool,
	toggleAllLabel: PropTypes.string,
	onToggleAll: PropTypes.func,
	emptyLabel: PropTypes.string,
	...ItemEditPropTypes,
};

export default Items;
