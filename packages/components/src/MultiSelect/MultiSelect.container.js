import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';

import theme from './MultiSelect.scss';
import OverlayTrigger from '../OverlayTrigger';
import VirtualizedList from '../VirtualizedList';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { Item, ItemView } from './MultiSelect.default';
import CircularProgress from '../CircularProgress';

const SELECT_ALL_VALUE = 'select-all';
const CREATE_NEW_VALUE = 'create-new';
const SPECIAL_VALUES = [SELECT_ALL_VALUE, CREATE_NEW_VALUE];

function getSelectedItems(props, state) {
	return props.titleMap.concat(state.added || []).filter(item => state.selected[item.value]);
}

function getTitleMap(props, state) {
	let titleMap = [
		{
			value: SELECT_ALL_VALUE,
			name: props.t('MULTI_SELECT_LABEL_SELECT_ALL', { defaultValue: 'Select all' }),
			selected: false,
		},
	];
	// apply search term on props.titleMap + state.added
	let found = props.titleMap.concat(state.added || []);
	let hasExactMatch = false;
	const searchTerm = (state.searchTerm || '').toLowerCase();
	if (searchTerm) {
		found = found.filter(item => {
			if (!hasExactMatch) {
				hasExactMatch = item.name.toLowerCase() === searchTerm;
			}
			return item.name.toLowerCase().indexOf(searchTerm) !== -1;
		});
	}
	if (Array.isArray(found)) {
		titleMap = titleMap.concat(found);
	}
	// apply selected
	const selected = Object.keys(state.selected || {});
	if (selected.length > 0) {
		titleMap = titleMap.map(item => ({
			name: item.name,
			value: item.value,
			selected: state.selected[item.value],
		}));
	}
	if (props.withCreateNew && state.searchTerm && !hasExactMatch) {
		titleMap.push({
			value: CREATE_NEW_VALUE,
			name: props.t('MULTI_SELECT_LABEL_CREATE_NEW', {
				defaultValue: '{{name}} (Create new)',
				name: state.searchTerm,
			}),
			selected: false,
		});
	}
	return titleMap;
}

function getTitleMapWithoutSpecialValues(titleMap) {
	return titleMap.filter(item => SPECIAL_VALUES.indexOf(item.value) === -1);
}

function initSelected(props) {
	return props.selected.reduce((acc, current) => {
		// eslint-disable-next-line no-param-reassign
		acc[current] = true;
		return acc;
	}, {});
}

/**
 * getStyle function returns CSS to adapt height of the dropdown
 * and align vertically the item in it
 * @param {integer} height integer in px
 * @returns string css style
 */
function getStyle(id, height, width = 300) {
	return `#${id}-overlay { width: ${width}px; max-width: ${width}px; }
	#${id}-overlay .popover-content { height: ${height}px; }`;
}

function noop() {}

class MultiSelect extends React.Component {
	static displayName = 'MultiSelect';
	static theme = theme;
	static defaultProps = {
		itemOptionRender: Item,
		itemViewRender: ItemView,
		selected: [],
		titleMap: [],
		onChange: noop,
	};
	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string,
		placeholder: PropTypes.string,
		t: PropTypes.func,
		selected: PropTypes.arrayOf(PropTypes.string),
		itemOptionRender: PropTypes.func,
		itemViewRender: PropTypes.func,
		withCreateNew: PropTypes.bool,
		readOnly: PropTypes.bool,
		disabled: PropTypes.bool,
		autoFocus: PropTypes.bool,
		loading: PropTypes.bool,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			selected: initSelected(props),
			added: [],
		};
		// this.titleMap = getTitleMap(props, this.state);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.getPopover = this.getPopover.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.noRowsRenderer = this.noRowsRenderer.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selected !== this.props.selected) {
			this.setState({
				selected: initSelected(nextProps),
			});
		}
	}

	onSelectAll(event) {
		// toggle the select only if all visible items are already selected
		const titleMap = getTitleMapWithoutSpecialValues(this.titleMap);
		const alreadySelected = titleMap.every(item => this.state.selected[item.value]);
		let selected = {};
		if (!alreadySelected) {
			selected = titleMap.reduce((acc, current) => {
				// eslint-disable-next-line no-param-reassign
				acc[current.value] = true;
				return acc;
			}, {});
		}
		if (this.props.onChange) {
			// controlled
			this.props.onChange(event, Object.keys(selected));
		} else {
			// uncontrolled
			this.setState({ selected });
		}
	}

	onSelectOne(event, id) {
		const selected = Object.assign({}, this.state.selected);
		if (selected[id]) {
			// eslint-disable-next-line no-param-reassign
			delete selected[id];
		} else {
			// eslint-disable-next-line no-param-reassign
			selected[id] = true;
		}
		if (this.props.onChange) {
			// controlled
			this.props.onChange(event, Object.keys(selected));
		} else {
			// uncontrolled
			this.setState({ selected });
		}
	}

	onSelectCreateNew(event) {
		const newItem = {
			name: this.state.searchTerm,
			value: this.state.searchTerm,
		};
		this.setState(prevState => {
			const selected = Object.assign({}, this.state.selected, {
				[newItem.value]: true,
			});
			prevState.added.push(newItem);
			// eslint-disable-next-line no-param-reassign
			prevState.searchTerm = '';
			if (this.props.onChange) {
				// controlled
				this.props.onChange(event, Object.keys(selected));
			} else {
				// uncontrolled
				// eslint-disable-next-line no-param-reassign
				prevState.selected = selected;
			}
			return Object.assign({}, prevState);
		});
	}

	onSearchChange(event) {
		const value = event.target.value;
		this.setState(prevState => {
			// eslint-disable-next-line no-param-reassign
			prevState.searchTerm = value;
			return prevState;
		});
	}

	onRowClick(event, id) {
		event.preventDefault();
		if (id === SELECT_ALL_VALUE) {
			// select all
			this.onSelectAll(event);
		} else if (this.props.withCreateNew && id === CREATE_NEW_VALUE) {
			this.onSelectCreateNew(event);
		} else {
			this.onSelectOne(event, id);
		}
	}

	getPopover() {
		if (this.props.loading) {
			return () => <CircularProgress />;
		}
		return () => (
			<VirtualizedList
				type="custom"
				rowHeight={this.props.itemOptionRender.rowHeight}
				rowRenderers={{ custom: this.props.itemOptionRender }}
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
		this.titleMap = getTitleMap(this.props, this.state);
		let height = this.props.itemOptionRender.rowHeight * 6;
		if (this.titleMap.length < 6) {
			height = this.props.itemOptionRender.rowHeight * this.titleMap.length;
		}
		let viewHeight = this.props.itemViewRender.rowHeight * 6;
		const nbSelected = Object.keys(this.state.selected).length;
		if (nbSelected < 6 && nbSelected > 0) {
			viewHeight = this.props.itemViewRender.rowHeight * nbSelected;
		}
		if (nbSelected === 0) {
			viewHeight = this.props.itemViewRender.rowHeight;
		}
		return (
			<div id={this.props.id} className={classnames('tc-multiselect', theme.container)}>
				<OverlayTrigger
					trigger="focus"
					overlayPlacement="bottom"
					overlayId={`${this.props.id}-overlay`}
					overlayClassName="tc-multiselect-overlay"
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
						onBlur={this.props.onBlur}
						onFocus={this.props.onFocus}
						disabled={this.props.disabled}
						autoFocus={this.props.autoFocus}
						readOnly={this.props.readOnly}
						ref={ref => {
							this.inputRef = ref;
							if (ref && this.state.width !== ref.offsetWidth) {
								this.setState({ width: ref.offsetWidth });
							}
						}}
					/>
				</OverlayTrigger>
				<style type="text/css">{getStyle(this.props.id, height, this.state.width)}</style>
				{this.state.selected && (
					<div className={theme.viewContainer} style={{ height: viewHeight }}>
						<VirtualizedList
							type="custom"
							rowHeight={this.props.itemViewRender.rowHeight}
							rowRenderers={{ custom: this.props.itemViewRender }}
							collection={getSelectedItems(this.props, this.state)}
							onRowClick={this.onRowClick}
							noRowsRenderer={this.noRowsRenderer}
							tabIndex="-1"
						/>
					</div>
				)}
			</div>
		);
	}
}

export default translate(I18N_DOMAIN_COMPONENTS)(MultiSelect);
