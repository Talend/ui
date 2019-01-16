import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';
import FieldTemplate from '../FieldTemplate';
import getDefaultT from '../../../translate';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PROPS_TO_OMIT = [
	'schema',
	'errorMessage',
	'errors',
	'isValid',
	'onChange',
	'onFinish',
	'onTrigger',
	'properties',
];

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
			options: {
				name: '',
				certified: false,
				favorites: false,
			},
			selected: [],
		};

		this.onFilter();
	}

	/**
	 * On change callback
	 * We call onFinish to trigger validation on resource picker item selection
	 * @param event
	 * @param payload
	 */
	onChange(event, payload) {
		const mergedSchema = this.props.schema;
		const payloadWithSchema = { ...payload, schema: mergedSchema };

		// this.callTrigger(event, payload);
		this.props.onChange(event, payloadWithSchema);
		this.props.onFinish(event, payloadWithSchema);
	}

	onFilter(event) {
		this.setState({ isLoading: true });
		this.props
			.onTrigger(event, {
				trigger: {
					parameters: this.state.options,
				},
				schema: this.props.schema,
			})
			.then(data => this.setState(data))
			.finally(() => this.setState({ isLoading: false }));
	}

	onRowClick(event, { id }) {
		let selected = [...this.state.selected];
		const index = selected.findIndex(i => i === id);
		const { options } = this.props.schema;

		if (!options.multi) {
			selected = [];
		}

		if (index > -1) {
			selected.splice(index, 1);
		} else {
			selected.push(id);
		}

		this.setState({ selected });
		this.onChange(event, selected);
	}

	isItemSelected({ id }) {
		return this.state.selected.includes(id);
	}

	stateFilterChanged(option, value) {
		this.setState(
			state => ({
				...state,
				options: {
					...state.options,
					[option]: value,
				},
			}),
			() => this.onFilter(null, this.state.options),
		);
	}

	nameFilterChanged(event) {
		const { target } = event;

		if (target) {
			this.setState(
				state => ({
					...state,
					options: {
						...state.options,
						name: target.value || '',
					},
				}),
				() => this.onFilter(null, this.state.options),
			);
		}
	}

	sortOptionChanged(option, value) {
		this.setState(
			state => ({
				...state,
				options: {
					...state.options,
					orders: {
						...state.options.orders,
						[option]: value,
					},
				},
			}),
			() => this.onFilter(null, this.state.options),
		);
	}

	render() {
		const { certified, favorites, orders } = this.state.options;
		const props = omit(this.props, PROPS_TO_OMIT);
		const descriptionId = generateDescriptionId(this.props.id);
		const errorId = generateErrorId(this.props.id);
		const toolbar = {
			name: {
				onChange: this.nameFilterChanged,
			},
			state: {
				onChange: this.stateFilterChanged,
				certified,
				favorites,
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
				labelAfter
			>
				<ResourcePickerComponent
					{...props}
					{...this.state}
					autoFocus={this.props.schema.autoFocus}
					disabled={this.props.schema.disabled || false}
					onFocus={this.callTrigger}
					placeholder={this.props.schema.placeholder}
					readOnly={this.props.schema.readOnly || false}
					toolbar={toolbar}
					onChange={this.onChange}
					isSelected={this.isItemSelected}
					onRowClick={this.onRowClick}
				/>
			</FieldTemplate>
		);
	}
}

ResourcePicker.displayName = 'ResourcePicker field';
ResourcePicker.defaultProps = {
	value: '',
	t: getDefaultT(),
};

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
			triggers: PropTypes.arrayOf(
				PropTypes.shape({
					onEvent: PropTypes.string,
				}),
			),
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			restricted: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
			options: PropTypes.shape({
				multi: PropTypes.bool,
			}),
		}),
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_FORMS)(ResourcePicker);
