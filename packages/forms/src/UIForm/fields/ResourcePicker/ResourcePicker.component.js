import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';
import omit from 'lodash/omit';
import { translate } from 'react-i18next';
import FieldTemplate from '../FieldTemplate';
import getDefaultT from '../../../translate';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import callTrigger from '../../trigger';
import { CHANGE } from './constants';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const CHANGE_EVENT = { type: CHANGE };
const PROPS_TO_OMIT = [
	'schema',
	'errorMessage',
	'errors',
	'isValid',
	'onChange',
	'onFinish',
	'onTrigger',
	'properties',
	'resolveName',
];

class ResourcePicker extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.callTrigger = this.callTrigger.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
		this.nameFilterChanged = this.nameFilterChanged.bind(this);
		this.stateFilterChanged = this.stateFilterChanged.bind(this);
		this.sortOptionChanged = this.sortOptionChanged.bind(this);

		this.state = {
			options: {
				name: '',
				certified: false,
				favorites: false,
			},
		};
	}

	componentDidMount() {
		this.callTrigger({ type: CHANGE });
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
		this.callTrigger(event, payload);
		this.props.onChange(event, payloadWithSchema);
		this.props.onFinish(event, payloadWithSchema);
	}

	onTrigger(event, trigger) {
		return this.props.onTrigger(event, {
			trigger,
			schema: this.props.schema,
			errors: this.props.errors,
			properties: this.props.properties,
		});
	}

	callTrigger(event) {
		callTrigger(event, {
			eventNames: [event.type],
			triggersDefinitions: this.props.schema.triggers,
			onTrigger: this.onTrigger,
			onLoading: isLoading => this.setState({ isLoading }),
			onResponse: data => this.setState(data),
		});
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
				() => this.onChange(event, this.state.options),
			);
		}
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
			() => this.onChange(CHANGE_EVENT, this.state.options),
		);
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
			() => this.onChange(CHANGE_EVENT, this.state.options),
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
				/>
			</FieldTemplate>
		);
	}
}

ResourcePicker.displayName = 'ResourcePicker field';
ResourcePicker.defaultProps = {
	resolveName: value => value,
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
		errors: PropTypes.object,
		properties: PropTypes.object,
		resolveName: PropTypes.func,
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
				isMultiSection: PropTypes.bool,
				titleMap: PropTypes.arrayOf(
					PropTypes.shape({
						title: PropTypes.string.isRequired,
						suggestions: PropTypes.arrayOf(
							PropTypes.shape({
								name: PropTypes.string.isRequired,
								value: PropTypes.string.isRequired,
							}),
						),
					}),
				),
			}),
		}),
		value: PropTypes.string,
		t: PropTypes.func,
	};
}

export default translate(I18N_DOMAIN_FORMS)(ResourcePicker);
