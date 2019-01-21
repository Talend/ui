import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

class ResourcePicker extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onFilter = this.onFilter.bind(this);
		this.nameFilterChanged = this.nameFilterChanged.bind(this);
		this.stateFilterChanged = this.stateFilterChanged.bind(this);
		this.sortOptionChanged = this.sortOptionChanged.bind(this);

		this.isItemSelected = this.isItemSelected.bind(this);
		this.onRowClick = this.onRowClick.bind(this);

		this.state = {
			filters: {
				name: '',
				certified: false,
				favorites: false,
				selection: false,
				selected: [],
			},
		};
	}

	componentDidMount() {
		this.onFilter();
	}

	onChange(event, value) {
		const { schema } = this.props;
		this.props.onChange(event, { schema, value });
		this.props.onFinish(event, { schema, value });
	}

	onFilter(event) {
		this.setState({ isLoading: true });
		this.props
			.onTrigger(event, {
				trigger: {
					parameters: this.state.filters,
				},
				schema: this.props.schema,
			})
			.then(data => this.setState(data))
			.finally(() => this.setState({ isLoading: false }));
	}

	onRowClick(event, { id }) {
		let selected = [...this.state.filters.selected];
		const index = selected.findIndex(i => i === id);

		if (!this.props.schema.multi) {
			selected = [];
		}

		if (index > -1) {
			selected.splice(index, 1);
		} else {
			selected.push(id);
		}

		this.setState({ filters: { ...this.state.filters, selected } });
		this.onChange(event, selected);
	}

	isItemSelected({ id }) {
		return this.state.filters.selected.includes(id);
	}

	stateFilterChanged(option, value) {
		this.setState(
			state => ({
				...state,
				filters: {
					...state.filters,
					[option]: value,
				},
			}),
			() => this.onFilter(null, this.state),
		);
	}

	nameFilterChanged(event) {
		const { target } = event;

		if (target) {
			this.setState(
				state => ({
					...state,
					filters: {
						...state.filters,
						name: target.value || '',
					},
				}),
				() => this.onFilter(null, this.state),
			);
		}
	}

	sortOptionChanged(option, value) {
		this.setState(
			state => ({
				...state,
				filters: {
					...state.filters,
					orders: {
						...state.orders,
						[option]: value,
					},
				},
			}),
			() => this.onFilter(null, this.state),
		);
	}

	render() {
		const { certified, favorites, selection, orders } = this.state.filters;
		const { id, schema } = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const toolbar = {
			name: {
				label: schema.placeholder,
				onChange: this.nameFilterChanged,
			},
			state: {
				onChange: this.stateFilterChanged,
				certified,
				favorites,
				selection,
			},
			sort: {
				onChange: this.sortOptionChanged,
				orders,
			},
		};

		return (
			<FieldTemplate
				description={this.props.schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={this.props.schema.title}
				required={this.props.schema.required}
			>
				<ResourcePickerComponent
					{...this.props}
					{...this.state}
					toolbar={toolbar}
					isSelected={this.isItemSelected}
					onRowClick={this.onRowClick}
				/>
			</FieldTemplate>
		);
	}
}

ResourcePicker.displayName = 'ResourcePicker field';

if (process.env.NODE_ENV !== 'production') {
	ResourcePicker.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onTrigger: PropTypes.func,
		schema: PropTypes.shape({
			schema: PropTypes.shape({
				type: PropTypes.string,
			}),
			description: PropTypes.string,
			placeholder: PropTypes.string,
			required: PropTypes.bool,
			title: PropTypes.string,
			multi: PropTypes.bool,
		}),
	};
}

export default ResourcePicker;
