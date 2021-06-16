import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { withTranslation } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';
import Item from './Item/Item.component';
import theme from './Items.scss';

const listClasses = classNames(theme['tc-list-items'], 'tc-list-items');
const itemsClasses = classNames(theme['tc-listview-items'], 'tc-listview-items');
const itemContainer = classNames(theme['tc-item-container'], 'tc-item-container');

/**
 * Converts a string px size in a JS valid number
 * @param {String} sizeInPixels
 * @returns {Number}
 */
function pxToInt(sizeInPixels = '0') {
	return parseFloat(sizeInPixels.replace('px', '')) || 0;
}

const TOGGLE_ALL_ROW_HEIGHT = 40;
const ROW_LINE_HEIGHT = pxToInt(theme['row-height']);
const ROW_VERTICAL_MARGIN = pxToInt(theme['row-vertical-margin']);
const ROW_HEIGHT = ROW_LINE_HEIGHT + ROW_VERTICAL_MARGIN;
const ROW_NESTED_INNER_MARGINS =
	pxToInt(theme['row-nested-inner-margin-top']) + pxToInt(theme['row-nested-inner-margin-bottom']);

export class ItemsComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
		this.getRowHeight = this.getRowHeight.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
		this.renderToggleAllOrItem = this.renderToggleAllOrItem.bind(this);
		this.renderToggleAll = this.renderToggleAll.bind(this);

		this.cache = new CellMeasurerCache({
			defaultHeight: props.getItemHeight ? props.getItemHeight() : ROW_HEIGHT,
			fixedWidth: true,
		});
	}

	getItemByIndex(index) {
		return this.props.items[index - Number(this.hasToggleAll)];
	}

	getRowHeight({ index }) {
		if (this.props.getItemHeight) {
			// If an height computation has been provided, use the "old"
			// way of computing row height with the provided computation
			return this.oldGetRowHeight.call(this, { index });
		}

		if (this.hasToggleAll && index === 0) {
			return TOGGLE_ALL_ROW_HEIGHT;
		}

		const isLastItem = index + (this.hasToggleAll ? 0 : 1) === this.props.items.length;
		const currentItem = this.getItemByIndex(index);

		let height = ROW_HEIGHT;

		if (isLastItem) {
			height += ROW_NESTED_INNER_MARGINS;
			height += this.hasToggleAll ? 1 : 0; // Horizontal "Toggle all" separation height
		}

		if (!currentItem || !currentItem.children || !currentItem.expanded) {
			return height;
		}

		return (
			height + // Own height
			currentItem.children.length * ROW_HEIGHT + // Children heights
			ROW_NESTED_INNER_MARGINS // Inner nested margins
		);
	}

	getRowCount() {
		if (this.hasToggleAll) {
			return this.props.items.length + 1;
		}
		return this.props.items.length;
	}

	oldGetRowHeight({ index }) {
		if (this.hasToggleAll && index === 0) {
			return TOGGLE_ALL_ROW_HEIGHT;
		}

		let extraHeight = 0;
		const currentItem = this.getItemByIndex(index);
		if (currentItem && currentItem.children && currentItem.expanded) {
			extraHeight = currentItem.children.length * this.props.getItemHeight();
		}

		return this.props.getItemHeight() + extraHeight;
	}

	rowRenderer(props) {
		const { key, index, style } = props;
		const isToggle = this.hasToggleAll && index === 0;
		const currentItem = this.getItemByIndex(index);
		return (
			<CellMeasurer
				cache={this.cache}
				columnIndex={0}
				key={key}
				parent={this.list}
				rowIndex={index}
			>
				{({ measure }) => (
					<div
						className={classNames(itemContainer, {
							[theme.toggle]: isToggle,
							toggle: isToggle,
							expanded: currentItem && currentItem.expanded,
						})}
						key={key}
						style={style}
					>
						{this.renderToggleAllOrItem(index, measure)}
					</div>
				)}
			</CellMeasurer>
		);
	}

	renderToggleAllOrItem(index, measure) {
		let computedIndex = index;

		if (this.hasToggleAll) {
			if (index === 0) {
				return this.renderToggleAll();
			}
			computedIndex = index - 1;
		}

		return this.renderItem(this.props.items[computedIndex], computedIndex, measure);
	}

	renderToggleAll() {
		const { id, isSwitchBox, toggleAllChecked, onToggleAll, t } = this.props;
		const toggleAllId = `${id || 'tc-listview'}-toggle-all`;
		const toggleAllSelector = isSwitchBox ? 'switch checkbox' : 'checkbox';
		const label = toggleAllChecked
			? t('LISTVIEW_ITEMS_DESELECT_ALL', { defaultValue: 'Deselect all' })
			: t('LISTVIEW_ITEMS_SELECT_ALL', { defaultValue: 'Select all' });

		return (
			<div className={toggleAllSelector}>
				<label htmlFor={toggleAllId}>
					<input
						id={toggleAllId}
						type="checkbox"
						onChange={onToggleAll}
						checked={toggleAllChecked}
					/>
					<strong>{label}</strong>
				</label>
			</div>
		);
	}

	renderItem(item, index, measure) {
		let computedId;
		if (this.props.id) {
			const computedIndex = this.hasToggleAll ? index + 1 : index;
			computedId = `${this.props.id}-${computedIndex}-item`;
		}

		return (
			<Item
				key={computedId}
				measure={measure}
				id={computedId}
				item={item}
				isSwitchBox={this.props.isSwitchBox && !item.children}
				searchCriteria={this.props.searchCriteria}
			>
				{item.children &&
					item.children.map((nestedItem, nestedIndex) => (
						<Item
							measure={measure}
							key={nestedIndex}
							item={nestedItem}
							parentItem={item}
							searchCriteria={this.props.searchCriteria}
						/>
					))}
			</Item>
		);
	}

	render() {
		this.hasToggleAll = this.props.showToggleAll && this.props.items.length > 1;

		return (
			<div className={itemsClasses}>
				<AutoSizer>
					{({ height, width }) => (
						<List
							/**
							 * The props 'items' and 'actions' does not exist in <List>
							 * but only way to refresh component when items or actions change
							 * See https://github.com/bvaughn/react-virtualized/#pure-components
							 */
							ref={node => {
								this.list = node;
							}}
							items={this.props.items}
							className={listClasses}
							rowRenderer={this.rowRenderer}
							width={width}
							height={height}
							rowCount={this.getRowCount()}
							rowHeight={this.getRowHeight}
							role="listbox"
							containerProps={this.props.containerProps}
						/>
					)}
				</AutoSizer>
			</div>
		);
	}
}

ItemsComponent.propTypes = {
	containerProps: PropTypes.object,
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			onChange: PropTypes.func,
			checked: PropTypes.bool,
			index: PropTypes.number,
		}),
	),
	isSwitchBox: PropTypes.bool,
	getItemHeight: PropTypes.func,
	searchCriteria: PropTypes.string,
	toggleAllChecked: PropTypes.bool,
	showToggleAll: PropTypes.bool,
	onToggleAll: PropTypes.func,
	t: PropTypes.func,
};

ItemsComponent.defaultProps = {
	t: getDefaultT(),
	isSwitchBox: false,
	showToggleAll: true,
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(ItemsComponent);
