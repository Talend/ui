import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';

import Action from '../../Actions/Action/Action.component';
import Item from './Item/Item.component';
import ItemEdit from './Item/ItemEdit.component';
import ItemEditPropTypes from './Item/ItemEdit.propTypes';
import theme from './Items.scss';

function listClasses() {
	return classNames({
		[theme['tc-list-items']]: true,
	});
}

function itemsClasses() {
	return classNames({
		[theme['tc-enumeration-items']]: true,
		'tc-enumeration-items': true,
	});
}

function itemContainer() {
	return classNames({
		[theme['tc-item-container']]: true,
		'tc-item-container': true,
	});
}

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

	getItem(item, index) {
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
						key={`${index}-item`}
						id={`${index}-item`}
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
						key={`${index}-item`}
						id={`${index}-item`}
						item={itemWithIndex}
						itemProps={itemPropDefault}
						searchCriteria={this.props.searchCriteria}
						showCheckboxes={this.props.showCheckboxes}
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
			if (event.target.className.includes(virtualizedListClassName) &&
				event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
				this.props.itemsProp.onLoadData();
			}
		}, 500);
	}


	rowRenderer({
		key,   // eslint-disable-line react/prop-types
		index, // eslint-disable-line react/prop-types
		style, // eslint-disable-line react/prop-types
	}) {
		return (
			<div className={itemContainer()} key={key} style={style}>
				{this.getItem(this.props.items[index], index)}
			</div>
		)
			;
	}

	render() {
		const actions = this.props.itemsProp && this.props.itemsProp.actionsDefault;
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
							rowCount={this.props.items.length}
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
		getItemHeight: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.number,
		]),
		onSubmitItem: PropTypes.func,
		onAbortItem: PropTypes.func,
		onSelectItem: PropTypes.func,
		actionsDefault: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
		actionsEdit: PropTypes.arrayOf(PropTypes.shape(Action.propTypes)),
	}).isRequired,
	...ItemEditPropTypes,
};

export default Items;
