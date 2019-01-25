import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import keycode from 'keycode';

import theme from './MultiSelect.scss';
import VirtualizedList from '../VirtualizedList';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { ItemOption } from './ItemOption.component';
import { ItemView } from './ItemView.component';
import Dropdown from './Dropdown.container';
import { CLEAR_ALL_VALUE, SELECT_ALL_VALUE, CREATE_NEW_VALUE, SPECIAL_VALUES } from './constants';
import { ActionButton } from '../Actions/ActionButton/ActionButton.component';
import Icon from '../Icon';

function getSelectedItems(props, state) {
	const selected = props.options
		.concat(state.added || [])
		.filter(item => state.selected.get(item.value));
	return selected;
}

function getOptions(props, state) {
	let options = [
		{
			value: SELECT_ALL_VALUE,
			name: props.t('MULTI_SELECT_LABEL_SELECT_ALL', { defaultValue: 'Select all' }),
			selected: false,
		},
	];
	// apply search term on props.options + state.added
	let found = props.options.concat(state.added || []);
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
		options = options.concat(found);
	}
	// apply selected
	options = options.map(item => ({
		name: item.name,
		value: item.value,
		selected: state.selected.get(item.value),
		searchTerm: state.searchTerm,
	}));
	if (props.withCreateNew && state.searchTerm && !hasExactMatch) {
		options.push({
			value: CREATE_NEW_VALUE,
			name: props.t('MULTI_SELECT_LABEL_CREATE_NEW', {
				defaultValue: '{{name}} (Create new)',
				name: state.searchTerm,
			}),
			selected: false,
		});
	}
	return options;
}

function getOptionsWithoutSpecialValues(options) {
	return options.filter(item => SPECIAL_VALUES.indexOf(item.value) === -1);
}

function initSelected(props) {
	return props.selected.reduce((acc, current) => {
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
		withCreateNew: PropTypes.bool,
		readOnly: PropTypes.bool,
		disabled: PropTypes.bool,
		autoFocus: PropTypes.bool,
		isLoading: PropTypes.bool,
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
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.getTarget = this.getTarget.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onDropdownHide = this.onDropdownHide.bind(this);
		this.onClearAll = this.onClearAll.bind(this);
	}

	componentDidMount() {
		const self = this;
		document.addEventListener('click', event => {
			// if event outside of me call onHide
			if (self.containerRef !== null && !isIn(event.target, self.containerRef)) {
				self.setState({ showDropdown: false });
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selected !== this.props.selected) {
			this.setState({
				selected: initSelected(nextProps),
			});
		}
	}

	onNewSelected(event, selected) {
		if (this.props.onChange) {
			// controlled
			this.props.onChange(event, Array.from(selected.keys()));
		} else {
			// uncontrolled
			this.setState({ selected });
		}
	}

	onDropdownHide(event) {
		if (event.target !== this.inputRef) {
			this.setState({ showDropdown: false });
		}
	}

	onKeyDown(event) {
		switch (event.which) {
			case keycode.codes.esc:
				event.preventDefault();
				this.setState({ showDropdown: false });
				break;
			default:
				break;
		}
	}

	onFocus(event) {
		this.setState({ showDropdown: true });
		if (this.props.onFocus) {
			this.props.onFocus(event);
		}
	}

	onClearAll(event) {
		const selected = new Map();
		this.onNewSelected(event, selected);
	}

	onSelectAll(event) {
		// toggle the select only if all visible items are already selected
		const options = getOptionsWithoutSpecialValues(getOptions(this.props, this.state));
		const alreadySelected = options.every(item => this.state.selected.get(item.value));
		let selected = new Map();
		if (!alreadySelected) {
			selected = options.reduce((acc, current) => {
				acc.set(current.value, true);
				return acc;
			}, new Map());
		}
		this.onNewSelected(event, selected);
	}

	onSelectOne(event, id) {
		const selected = new Map(this.state.selected);
		if (selected.has(id)) {
			// eslint-disable-next-line no-param-reassign
			selected.delete(id);
		} else {
			// eslint-disable-next-line no-param-reassign
			selected.set(id, true);
		}
		this.onNewSelected(event, selected);
	}

	onSelectCreateNew(event) {
		const newItem = {
			name: this.state.searchTerm,
			value: this.state.searchTerm,
		};
		const selected = new Map(this.state.selected);
		selected.set(newItem.value, true);
		this.onNewSelected(event, selected);

		this.setState(prevState => {
			prevState.added.push(newItem);
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
		if (id === SELECT_ALL_VALUE) {
			this.onSelectAll(event);
		} else if (id === CLEAR_ALL_VALUE) {
			this.onClearAll(event);
		} else if (this.props.withCreateNew && id === CREATE_NEW_VALUE) {
			this.onSelectCreateNew(event);
		} else {
			this.onSelectOne(event, id);
		}
	}

	getTarget() {
		// eslint-disable-next-line react/no-find-dom-node
		return ReactDOM.findDOMNode(this.inputRef);
	}

	render() {
		const items = getOptions(this.props, this.state);
		const height = this.props.isLoading
			? 120
			: this.props.itemOptionRender.rowHeight * Math.min(items.length, 6);

		const nbSelected = this.state.selected.size;
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
				<ActionButton
					icon="talend-cross"
					bsStyle="link"
					className={classnames('btn-icon-only', 'btn-sm', theme.clearAll)}
					label={this.props.t('MULTI_SELECT_LABEL_CLEAR_ALL', { defaultValue: 'Clear all' })}
					onClick={this.onClearAll}
					hideLabel
				/>
				<input
					type="text"
					role="search"
					className="form-control"
					name={this.props.name}
					onBlur={this.props.onBlur}
					onChange={this.onSearchChange}
					onFocus={this.onFocus}
					onKeyDown={this.onKeyDown}
					disabled={this.props.disabled}
					autoFocus={this.props.autoFocus}
					placeholder={this.props.placeholder}
					readOnly={this.props.readOnly}
					value={this.state.value}
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
						onHide={this.onDropdownHide}
					/>
				)}
				{!this.state.showDropdown && nbSelected > 0 && (
					<div style={{ height: viewHeight }}>
						<VirtualizedList
							type="tc-multiselect"
							rowHeight={this.props.itemViewRender.rowHeight}
							rowRenderers={{ 'tc-multiselect': this.props.itemViewRender }}
							collection={getSelectedItems(this.props, this.state)}
							onRowClick={this.onRowClick}
							tabIndex={-1}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default translate(I18N_DOMAIN_COMPONENTS)(MultiSelect);
