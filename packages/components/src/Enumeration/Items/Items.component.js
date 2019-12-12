import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';

import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';

const DISPLAY_MODE_EDIT = 'DISPLAY_MODE_EDIT';

const virtualizedListClassName = 'ReactVirtualized__List';

class Items extends React.PureComponent {
	constructor(props) {
		super(props);
		this.lazyLoadingTimer = null;
		this.getItem = this.getItem.bind(this);
		this.getRowHeight = this.getRowHeight.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
		this.scrollEnumeration = this.scrollEnumeration.bind(this);
	}

	getItem(item, index, style) {
		// affecting index to the item
		const itemWithIndex = {
			...item,
			index,
		};

		switch (item.displayMode) {
			case DISPLAY_MODE_EDIT: {
				itemWithIndex.itemProps = {
					key: this.props.itemsProp.key,
					actions: this.props.itemsProp.actionsEdit,
					onSubmitItem: this.props.itemsProp.onSubmitItem,
					onAbortItem: this.props.itemsProp.onAbortItem,
					onChangeItem: this.props.itemsProp.onChangeItem,
				};

				return (
					<ItemEdit
						key={`${index}-item`}
						id={`${this.props.id}-${index}-item`}
						item={itemWithIndex}
						currentEdit={this.props.currentEdit}
						style={style}
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
						key={`${index}-item`}
						id={`${this.props.id}-${index}-item`}
						item={itemWithIndex}
						itemProps={itemPropDefault}
						searchCriteria={this.props.searchCriteria}
						showCheckboxes={this.props.showCheckboxes}
						style={style}
					/>
				);
			}
		}
	}

	getRowHeight({ index }) {
		const isEditMode = this.props.items[index].displayMode === DISPLAY_MODE_EDIT;
		return this.props.itemsProp.getItemHeight(isEditMode);
	}

	scrollEnumeration(event) {
		// needed because of React's event pooling
		event.persist();
		if (this.lazyLoadingTimer !== null) {
			clearTimeout(this.lazyLoadingTimer);
		}

		this.lazyLoadingTimer = setTimeout(() => {
			// react-virtualized fire scroll events not to be considered
			if (
				event.target.className.includes(virtualizedListClassName) &&
				event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight
			) {
				this.props.itemsProp.onLoadData();
			}
		}, 500);
	}

	rowRenderer({
		index, // eslint-disable-line react/prop-types
		style, // eslint-disable-line react/prop-types
	}) {
		return this.getItem(this.props.items[index], index, style);
	}

	render() {
		const { calculateListHeight } = this.props.itemsProp;
		const actions = this.props.itemsProp && this.props.itemsProp.actionsDefault;
		const ListItems = (
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
						className={theme['tc-list-items']}
						rowRenderer={this.rowRenderer}
						width={width}
						height={height}
						rowCount={this.props.items.length}
						rowHeight={this.getRowHeight}
					/>
				)}
			</AutoSizer>
		);
		return calculateListHeight ? (
			<div
				className={classNames(theme['tc-enumeration-items'], 'tc-enumeration-items')}
				onScroll={this.scrollEnumeration}
				style={{ height: `${calculateListHeight(this.props.items)}px` }}
			>
				{ListItems}
			</div>
		) : (
			<div
				className={classNames(theme['tc-enumeration-items'], 'tc-enumeration-items')}
				onScroll={this.scrollEnumeration}
			>
				{ListItems}
			</div>
		);
	}
}

Items.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			values: PropTypes.arrayOf(PropTypes.string),
		}),
	),
	searchCriteria: PropTypes.string,
	itemsProp: PropTypes.shape({
		key: PropTypes.string.isRequired,
		getItemHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	...ItemEditPropTypes,
};

export default Items;
