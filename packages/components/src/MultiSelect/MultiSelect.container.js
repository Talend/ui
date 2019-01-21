import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import theme from './MultiSelect.scss';
import OverlayTrigger from '../OverlayTrigger';
import VirtualizedList from '../VirtualizedList';
import I18N_DOMAIN_COMPONENTS from '../constants';

const SELECT_ALL_VALUE = 'select-all';
const SELECT_ALL = { value: SELECT_ALL_VALUE, name: 'Select all', selected: {} };
const CREATE_NEW_VALUE = 'create-new';
const CREATE_NEW = { value: CREATE_NEW_VALUE, name: 'Create new', selected: {} };
const SPECIAL_VALUES = [SELECT_ALL_VALUE, CREATE_NEW_VALUE];
const ROW_HEIGHT = 40;

export function Item(props) {
	const item = props.parent.props.collection[props.index];
	return (
		<a
			className={classnames(theme.row, 'tc-multi-select-item', {
				active: (item.selected || {})[item.value],
			})}
			id={`multi-select-${item.value}`}
			onClick={event => props.parent.props.onRowClick({ event, rowData: item.value })}
			href={`#/${item.value}`}
		>
			{item.name}
		</a>
	);
}
Item.propTypes = {
	index: PropTypes.number,
	parent: PropTypes.shape({
		props: PropTypes.shape({ collection: PropTypes.array }),
	}),
};

function getSelectedItems(props, state) {
	return props.titleMap.filter(item => state.selected[item.value]);
}

function getTitleMap(props, state) {
	let titleMap = [SELECT_ALL];
	// apply search term
	let found = props.titleMap;
	let hasExactMatch = false;
	const searchTerm = (state.searchTerm || '').toLowerCase();
	if (searchTerm) {
		found = props.titleMap.filter(item => {
			if (!hasExactMatch) {
				hasExactMatch = item.name.toLowerCase() === searchTerm;
			}
			return item.name.toLowerCase().indexOf(searchTerm) !== -1;
		});
	}
	titleMap = titleMap.concat(found);
	// apply selected
	const selected = Object.keys(state.selected || {});
	if (selected.length > 0) {
		titleMap.forEach(item => {
			item.selected = state.selected;
		});
	}
	if (props.withCreateNew && state.searchTerm && !hasExactMatch) {
		titleMap.push(CREATE_NEW);
	}
	return titleMap;
}

function getTitleMapWithoutSpecialValues(titleMap) {
	return titleMap.filter(item => SPECIAL_VALUES.indexOf(item.value) === -1);
}

function ItemView(props) {
	return <div className={theme.itemView}>{props.parent.props.collection[props.index].name}</div>;
}

function initSelected(props) {
	return props.selected.reduce((acc, current) => {
		acc[current] = true;
	}, {});
}

/**
 * getStyle function returns CSS to adapt height of the dropdown
 * @param {integer} height integer in px
 * @returns string css style
 */
function getStyle(height) {
	return `.${theme.itemView}, .${theme.row} { height: ${ROW_HEIGHT}px}
	#multi-select-suggestion {
		height: ${height}px;
	}`;
}

class MultiSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: initSelected(props),
		};
		this.titleMap = getTitleMap(props, this.state);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.getPopover = this.getPopover.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.noRowsRenderer = this.noRowsRenderer.bind(this);
	}

	componentWillReceiveProps(nextProps, nextState) {
		this.titleMap = getTitleMap(nextProps, nextState);
		if (nextProps.selected !== this.props.selected) {
			this.setState({
				selected: initSelected(nextProps),
			});
		}
	}

	onSelectAll() {
		// toggle the select only if all visible items are already selected
		const titleMap = getTitleMapWithoutSpecialValues(this.titleMap);
		const alreadySelected = titleMap.every(item => this.state.selected[item.value]);
		const selected = titleMap.reduce((acc, current) => {
			acc[current.value] = !alreadySelected;
			return acc;
		}, {});
		this.setState(prevState => {
			prevState.selected = selected;
			this.titleMap = getTitleMap(this.props, prevState);
			return prevState;
		});
	}

	onSelectOne(id) {
		this.setState(prevState => {
			if (prevState.selected[id]) {
				delete prevState.selected[id];
			} else {
				prevState.selected[id] = true;
			}
			this.titleMap = getTitleMap(this.props, prevState);
			return Object.assign({}, prevState);
		});
	}

	onSearchChange(event) {
		const value = event.target.value;
		this.setState(prevState => {
			prevState.searchTerm = value;
			this.titleMap = getTitleMap(this.props, prevState);
			return prevState;
		});
	}

	onRowClick(event, id) {
		event.preventDefault();
		if (id === SELECT_ALL_VALUE) {
			// select all
			this.onSelectAll();
		} else if (this.props.withCreateNew && id === CREATE_NEW_VALUE) {
			this.onSelectCreateNew();
		} else {
			this.onSelectOne(id);
		}
	}

	getPopover() {
		return () => (
			<VirtualizedList
				type="custom"
				rowHeight={ROW_HEIGHT}
				rowRenderers={{ custom: Item }}
				collection={this.titleMap}
				onRowClick={this.onRowClick}
			/>
		);
	}

	noRowsRenderer() {
		return (
			<div>
				{this.props.t('MULTI_SELECT_NOTHING_SELECTED', { defaultValue: 'No item selected' })}
			</div>
		);
	}

	render() {
		let height = 250;
		if (this.titleMap.length < 6) {
			height = ROW_HEIGHT * this.titleMap.length;
		}
		let viewHeight = 250;
		const nbSelected = Object.keys(this.state.selected).length;
		if (nbSelected < 6 && nbSelected > 0) {
			viewHeight = ROW_HEIGHT * nbSelected;
		}
		if (nbSelected === 0) {
			viewHeight = ROW_HEIGHT;
		}
		return (
			<div className={classnames('tc-multiselect', theme.container)}>
				<OverlayTrigger
					trigger="focus"
					overlayPlacement="bottom"
					overlayId="multi-select-suggestion"
					overlayComponent="MultiSelect"
					overlayRef={ref => {
						this.overlayRef = ref;
					}}
					getComponent={this.getPopover}
				>
					<input
						type="text"
						role="search"
						className="form-control"
						placeholder={this.props.placeholder}
						name={this.props.name}
						value={this.state.value}
						onChange={this.onSearchChange}
					/>
				</OverlayTrigger>
				<style>{getStyle(height)}</style>
				{this.state.selected && (
					<div style={{ height: viewHeight }}>
						<VirtualizedList
							type="custom"
							rowHeight={ROW_HEIGHT}
							rowRenderers={{ custom: ItemView }}
							collection={getSelectedItems(this.props, this.state)}
							onRowClick={this.onRowClick}
							noRowsRenderer={this.noRowsRenderer}
						/>
					</div>
				)}
			</div>
		);
	}
}
MultiSelect.displayName = 'MultiSelect';
MultiSelect.propTypes = {
	// 	onSelect: PropTypes.func,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	t: PropTypes.func,
	// 	autoFocus: PropTypes.bool,
	// 	maxHeight: PropTypes.number,
	// 	values: PropTypes.arrayOf(),
};
MultiSelect.defaultProps = {
	maxHeight: 300,
	selected: [],
};
export default translate(I18N_DOMAIN_COMPONENTS)(MultiSelect);
