/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import keycode from 'keycode';
import memoizeOne from 'memoize-one';

import theme from './MultiSelect.scss';
import VirtualizedList from '../VirtualizedList';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { ItemOption } from './ItemOption.component';
import { ItemView } from './ItemView.component';
import Dropdown from './Dropdown.container';
import { SELECT_ALL_VALUE, CREATE_NEW_VALUE } from './constants';
import { ActionButton } from '../Actions';
import Icon from '../Icon';

function initSelectedMap(selected) {
	return selected.reduce((acc, current) => {
		acc.set(current, true);
		return acc;
	}, new Map());
}

function isIn(element, container) {
	if (element.parentElement === null) {
		return false;
	}
	if (element.parentElement !== container) {
		return isIn(element.parentElement, container);
	}
	return true;
}

class MultiSelect extends React.Component {
	static displayName = 'MultiSelect';

	static theme = theme;

	static defaultProps = {
		itemOptionRender: ItemOption,
		itemViewRender: ItemView,
		selected: [],
		options: [],
	};

	static propTypes = {
		id: PropTypes.string.isRequired,
		name: PropTypes.string,
		placeholder: PropTypes.string,
		t: PropTypes.func,
		selected: PropTypes.arrayOf(PropTypes.string),
		itemOptionRender: PropTypes.func,
		itemViewRender: PropTypes.func,
		restricted: PropTypes.bool,
		readOnly: PropTypes.bool,
		disabled: PropTypes.bool,
		autoFocus: PropTypes.bool,
		isLoading: PropTypes.bool,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		options: PropTypes.array,
	};

	constructor(props) {
		super(props);
		this.state = { added: [] };
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onClearAll = this.onClearAll.bind(this);
		this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
		this.initSelectedMap = memoizeOne(initSelectedMap);
	}

	componentDidMount() {
		document.addEventListener('click', this.closeOnOutsideClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.closeOnOutsideClick);
	}

	closeOnOutsideClick(event) {
		if (this.containerRef !== null && !isIn(event.target, this.containerRef)) {
			this.setState({ showDropdown: false, searchTerm: '' });
		}
	}

	onInputFocus(event) {
		this.setState({ showDropdown: true });
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	}

	onInputKeyDown(event) {
		if (event.which === keycode.codes.esc) {
			event.preventDefault();
			this.setState({ showDropdown: false });
		}
	}

	onClearAll(event) {
		this.updateSelection(event, new Map());
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	onRowClick(event, action) {
		switch (action) {
			case SELECT_ALL_VALUE:
				this.selectAll(event);
				break;
			case CREATE_NEW_VALUE:
				this.createNew(event);
				break;
			default:
				this.selectOne(event, action);
		}
	}

	getSelectedMap() {
		// uncontrolled
		if (this.state.selected) {
			return this.state.selected;
		}
		// controlled
		return this.initSelectedMap(this.props.selected);
	}

	getSelectedItems() {
		const selected = this.getSelectedMap();
		return this.props.options
			.concat(this.state.added || [])
			.filter(item => selected.get(item.value));
	}

	getFilteredOptions() {
		const { added = [], searchTerm = '' } = this.state;
		const { options, restricted, t } = this.props;
		const baseOptions = options.concat(added);

		if (!searchTerm) {
			return baseOptions;
		}

		// filter base options
		let hasExactMatch = false;
		const lowerSearchTerm = searchTerm.toLowerCase();
		const filteredOptions = baseOptions.filter(({ name }) => {
			const lowerOption = name.toLowerCase();
			hasExactMatch = hasExactMatch || lowerOption === lowerSearchTerm;
			return name.toLowerCase().indexOf(lowerSearchTerm) !== -1;
		});

		// insert new value creation option
		if (!restricted && !hasExactMatch) {
			filteredOptions.push({
				value: CREATE_NEW_VALUE,
				name: t('MULTI_SELECT_LABEL_CREATE_NEW', {
					defaultValue: '{{name}} (Create new)',
					name: searchTerm,
				}),
			});
		}

		return filteredOptions;
	}

	getListItems() {
		const { searchTerm } = this.state;
		const { t } = this.props;

		// apply search term on passed + added options
		const options = this.getFilteredOptions().map(item => ({
			name: item.name,
			value: item.value,
			selected: this.getSelectedMap().get(item.value),
			searchTerm,
		}));

		// insert select all option
		if (options.length) {
			const allSelected = options.every(item => item.selected);
			options.unshift({
				value: SELECT_ALL_VALUE,
				name: allSelected
					? t('MULTI_SELECT_LABEL_DESELECT_ALL', { defaultValue: 'Deselect all' })
					: t('MULTI_SELECT_LABEL_SELECT_ALL', { defaultValue: 'Select all' }),
				selected: allSelected,
			});
		}

		return options;
	}

	createNew(event) {
		const newItem = {
			name: this.state.searchTerm,
			value: this.state.searchTerm,
		};
		const selected = new Map(this.getSelectedMap());
		selected.set(newItem.value, true);
		this.updateSelection(event, selected);
		this.setState(({ added }) => ({ added: added.concat([newItem]) }));
	}

	selectAll(event) {
		// toggle the select only if all visible items are already selected
		const selected = this.getSelectedMap();
		const options = this.getFilteredOptions();
		const alreadySelected = options.every(({ value }) => selected.get(value));
		const newSelected = new Map(selected);
		options.reduce((acc, current) => {
			if (!alreadySelected) {
				acc.set(current.value, true);
			} else {
				acc.delete(current.value);
			}
			return acc;
		}, newSelected);
		this.updateSelection(event, newSelected);
	}

	selectOne(event, id) {
		const selected = new Map(this.getSelectedMap());
		if (selected.get(id)) {
			selected.delete(id);
		} else {
			selected.set(id, true);
		}
		this.updateSelection(event, selected);
	}

	updateSelection(event, selected) {
		if (this.props.onChange) {
			// controlled
			this.props.onChange(event, Array.from(selected.keys()));
		} else {
			// uncontrolled
			this.setState({ selected });
		}
	}

	render() {
		const items = this.getListItems();
		const height = this.props.isLoading
			? 120
			: this.props.itemOptionRender.rowHeight * Math.min(items.length, 6);

		const nbSelected = this.getSelectedMap().size;
		const viewHeight = this.props.itemViewRender.rowHeight * Math.min(6, nbSelected + 1);

		return (
			<div
				id={this.props.id}
				className={classnames('tc-multiselect', theme.container)}
				ref={ref => {
					this.containerRef = ref;
				}}
			>
				<Icon
					name="talend-caret-down"
					className={theme.caret}
					transform={this.state.showDropdown ? 'flip-vertical' : null}
				/>
				{!!nbSelected && (
					<ActionButton
						icon="talend-cross"
						bsStyle="link"
						className={classnames('btn-icon-only', 'btn-sm', theme.clearall)}
						label={this.props.t('MULTI_SELECT_LABEL_CLEAR_ALL', { defaultValue: 'Clear all' })}
						onClick={this.onClearAll}
						hideLabel
					/>
				)}
				<input
					type="text"
					role="search"
					className="form-control"
					name={this.props.name}
					onBlur={this.props.onBlur}
					onChange={this.onSearchChange}
					onFocus={this.onInputFocus}
					onKeyDown={this.onInputKeyDown}
					disabled={this.props.disabled}
					autoFocus={this.props.autoFocus}
					placeholder={this.props.placeholder}
					readOnly={this.props.readOnly}
					value={this.state.searchTerm}
					ref={ref => {
						this.inputRef = ref;
					}}
				/>
				{this.state.showDropdown && (
					<Dropdown
						height={height}
						isLoading={this.props.isLoading}
						items={items}
						onRowClick={this.onRowClick}
						renderItem={this.props.itemOptionRender}
					/>
				)}
				{!this.state.showDropdown && nbSelected > 0 && (
					<div style={{ height: viewHeight }}>
						<VirtualizedList
							type="tc-multiselect"
							rowHeight={this.props.itemViewRender.rowHeight}
							rowRenderers={{ 'tc-multiselect': this.props.itemViewRender }}
							collection={this.getSelectedItems()}
							onRowClick={this.onRowClick}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default withTranslation(I18N_DOMAIN_COMPONENTS)(MultiSelect);
