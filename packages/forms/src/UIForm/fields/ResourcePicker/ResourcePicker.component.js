import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
import { CHANGE, FILTER } from './constants';

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
		this.setState({ isLoading: true }, () => {
			this.onTrigger(event, FILTER, { filters: this.state.filters })
				.then(data => this.setState(data))
				.finally(() => this.setState({ isLoading: false }));
		});
	}

	onTrigger(event, eventName, payload) {
		const { schema, properties, errors } = this.props;
		const trigger = schema.triggers && schema.triggers.find(trig => trig.onEvent === eventName);

		if (trigger) {
			return this.props.onTrigger(event, {
				trigger,
				schema,
				properties,
				errors,
				...payload,
			});
		}

		return Promise.resolve();
	}

	onRowClick(event, { id }) {
		let selected = [...this.state.filters.selected];
		const index = selected.findIndex(i => i === id);
		const { multi } = this.props.schema;

		if (!multi) {
			selected = [];
		}

		if (index > -1) {
			if (multi || !this.props.schema.required) {
				selected.splice(index, 1);
			} else {
				// in single selection if the resource is already selected do nothing
				return;
			}
		} else {
			selected.push(id);
		}

		const value = multi ? selected : selected[0];
		this.setState({ filters: { ...this.state.filters, selected } });
		this.onChange(event, value);
		this.onTrigger(event, CHANGE, { value });
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
		const { orders } = this.state.filters;
		const { id, schema, isValid, errorMessage } = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const toolbar = {
			name: {
				label: schema.placeholder,
				value: this.state.filters.name,
				onChange: this.nameFilterChanged,
			},
			state: {
				onChange: this.stateFilterChanged,
			},
			sort: {
				onChange: this.sortOptionChanged,
				orders,
			},
		};

		if (schema.options) {
			const { filters, sort } = schema.options;
			if (filters) {
				filters.forEach(filter => {
					toolbar.state[filter] = this.state.filters[filter];
				});
				// only display the filter which are defined in the schema
				toolbar.state.types = [...filters];
			}
			if (sort) {
				// only display the filter which are defined in the schema
				toolbar.sort.types = [...sort];
			}
		}

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={errorMessage}
				id={id}
				isValid={isValid}
				label={schema.title}
				required={schema.required}
			>
				<ResourcePickerComponent
					{...this.props}
					{...this.state}
					toolbar={toolbar}
					isSelected={this.isItemSelected}
					onRowClick={this.onRowClick}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={schema.required}
					aria-describedby={`${descriptionId} ${errorId}`}
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
		properties: PropTypes.object,
		errors: PropTypes.object,
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
