import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import Overlay from 'react-bootstrap/lib/Overlay';
import keycode from 'keycode';

import theme from './MultiSelect.scss';
// import OverlayTrigger from '../OverlayTrigger';
import VirtualizedList from '../VirtualizedList';
import I18N_DOMAIN_COMPONENTS from '../constants';
import { ItemOption } from './ItemOption.component';
import { ItemView } from './ItemView.component';
import Dropdown from './Dropdown.container';
import { CLEAR_ALL_VALUE, SELECT_ALL_VALUE, CREATE_NEW_VALUE, SPECIAL_VALUES } from './constants';

function getSelectedItems(props, state) {
	const selected = props.options
		.concat(state.added || [])
		.filter(item => state.selected.get(item.value));
	if (selected && selected.length > 0) {
		selected.unshift({
			value: CLEAR_ALL_VALUE,
			name: props.t('MULTI_SELECT_LABEL_CLEAR_ALL', { defaultValue: 'Clear all' }),
			selected: false,
		});
	}
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
	const selected = Array.from(state.selected.keys());
	if (selected.length > 0) {
		options = options.map(item => ({
			name: item.name,
			value: item.value,
			selected: state.selected.get(item.value),
		}));
	}
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
		this.noRowsRenderer = this.noRowsRenderer.bind(this);
		this.getTarget = this.getTarget.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onDropdownHide = this.onDropdownHide.bind(this);
		this.onClearAll = this.onClearAll.bind(this);
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
		event.preventDefault();
		if (id === SELECT_ALL_VALUE) {
			// select all
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

	noRowsRenderer() {
		return (
			<div>
				{this.props.t('MULTI_SELECT_NOTHING_SELECTED', { defaultValue: 'No item selected' })}
			</div>
		);
	}

	render() {
		const items = getOptions(this.props, this.state);
		let height = this.props.itemOptionRender.rowHeight * 6;
		if (items.length < 6) {
			height = this.props.itemOptionRender.rowHeight * items.length;
		}
		if (this.props.isLoading) {
			height = 120;
		}
		let viewHeight = this.props.itemViewRender.rowHeight * 6;
		const nbSelected = Array.from(this.state.selected.keys()).length;
		if (nbSelected < 6 && nbSelected > 0) {
			viewHeight = this.props.itemViewRender.rowHeight * (nbSelected + 1);
		}
		if (nbSelected === 0) {
			viewHeight = this.props.itemViewRender.rowHeight;
		}
		return (
			<div id={this.props.id} className={classnames('tc-multiselect', theme.container)}>
				<input
					type="text"
					role="search"
					className="form-control"
					placeholder={this.props.placeholder}
					name={this.props.name}
					value={this.state.value}
					onChange={this.onSearchChange}
					onBlur={this.props.onBlur}
					onFocus={this.onFocus}
					onKeyDown={this.onKeyDown}
					onKeyPress={this.onKeyDown}
					onKeyUp={this.onKeyDown}
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
				<div
					className={theme.overlay}
					ref={ref => {
						this.overlayContainerRef = ref;
					}}
				>
					<Overlay
						show={this.state.showDropdown}
						placement="bottom"
						id={`${this.props.id}-overlay`}
						container={this.overlayContainerRef}
						target={this.getTarget}
						ref={ref => {
							this.overlayRef = ref;
						}}
					>
						<Dropdown
							show={this.state.showDropdown}
							height={height}
							isLoading={this.props.isLoading}
							items={items}
							onRowClick={this.onRowClick}
							renderItem={this.props.itemOptionRender}
							onHide={this.onDropdownHide}
						/>
					</Overlay>
				</div>
				{!this.state.showDropdown && (
					<div className={theme.viewContainer} style={{ height: viewHeight }}>
						<VirtualizedList
							type="custom"
							rowHeight={this.props.itemViewRender.rowHeight}
							rowRenderers={{ custom: this.props.itemViewRender }}
							collection={getSelectedItems(this.props, this.state)}
							onRowClick={this.onRowClick}
							noRowsRenderer={this.noRowsRenderer}
							tabIndex={-1}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default translate(I18N_DOMAIN_COMPONENTS)(MultiSelect);
