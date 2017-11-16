import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { AutoSizer, List } from 'react-virtualized';
import { translate } from 'react-i18next';

import I18N_DOMAIN_COMPONENTS from '../../constants';
import { DEFAULT_I18N, getDefaultTranslate } from '../../translate';
import Item from './Item/Item.component';
import theme from './Items.scss';

function listClasses() {
	return classNames(theme['tc-list-items'], 'tc-list-items');
}

function itemsClasses() {
	return classNames(theme['tc-listview-items'], 'tc-listview-items');
}

function itemContainer(additionalClassName) {
	return classNames(
		theme['tc-item-container'],
		theme[additionalClassName],
		'tc-item-container',
		additionalClassName,
	);
}

class Items extends React.PureComponent {
	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
		this.getRowHeight = this.getRowHeight.bind(this);
		this.rowRenderer = this.rowRenderer.bind(this);
		this.renderToggleAllOrItem = this.renderToggleAllOrItem.bind(this);
		this.renderToggleAll = this.renderToggleAll.bind(this);

		this.hasToggleAll = this.props.items.length > 1;
	}

	getRowHeight({ index }) {
		if (this.hasToggleAll && index === 0) {
			return 40;
		}
		return this.props.getItemHeight();
	}

	getRowCount() {
		if (this.hasToggleAll) {
			return this.props.items.length + 1;
		}
		return this.props.items.length;
	}

	rowRenderer(props) {
		const { key, index, style } = props;
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
		const { id, toggleAllChecked, onToggleAll, t } = this.props;
		const toggleAllId = `${id || 'tc-listview'}-toggle-all`;
		return (
			<div className="checkbox">
				<label htmlFor={toggleAllId}>
					<input
						id={toggleAllId}
						type="checkbox"
						onChange={onToggleAll}
						checked={!!toggleAllChecked}
					/>
					<strong>{t('LISTVIEW_ITEMS_TOGGLE_ALL', 'Toggle all')}</strong>
				</label>
			</div>
		);
	}

	renderItem(item, index) {
		let computedId;
		if (this.props.id) {
			const computedIndex = this.hasToggleAll ? index + 1 : index;
			computedId = `${this.props.id}-${computedIndex}-item`;
		}

		return (
			<Item
				key={computedId}
				id={computedId}
				item={item}
				searchCriteria={this.props.searchCriteria}
			/>
		);
	}

	render() {
		return (
			<div className={itemsClasses()}>
				<AutoSizer>
					{({ height, width }) => (
						<List
							/**
							 * The props 'items' and 'actions' does not exist in <List>
							 * but only way to refresh component when items or actions change
							 * See https://github.com/bvaughn/react-virtualized/#pure-components
							 */
							items={this.props.items}
							className={listClasses()}
							rowRenderer={this.rowRenderer}
							width={width}
							height={height}
							rowCount={this.getRowCount()}
							rowHeight={this.getRowHeight}
						/>
					)}
				</AutoSizer>
			</div>
		);
	}
}

Items.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			onChange: PropTypes.func,
			checked: PropTypes.bool,
			index: PropTypes.number,
		}),
	),
	getItemHeight: PropTypes.func,
	searchCriteria: PropTypes.string,
	toggleAllChecked: PropTypes.bool,
	onToggleAll: PropTypes.func,
	t: PropTypes.func,
};

Items.defaultProps = {
	t: getDefaultTranslate,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(Items);
