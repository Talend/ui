import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataListComponent from '@talend/react-components/lib/Datalist';
import omit from 'lodash/omit';
import get from 'lodash/get';
import { withTranslation } from 'react-i18next';
import FieldTemplate from '../FieldTemplate';
import getDefaultT from '../../../translate';
import { I18N_DOMAIN_FORMS } from '../../../constants';
import callTrigger from '../../trigger';
import { DID_MOUNT } from './constants';
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
	'resolveName',
];

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
		this.getTitleMap = this.getTitleMap.bind(this);
		this.callTrigger = this.callTrigger.bind(this);
		this.onTrigger = this.onTrigger.bind(this);
	}

	componentDidMount() {
		this.callTrigger({ type: DID_MOUNT });
	}
	/**
	 * On change callback
	 * We call onFinish to trigger validation on datalist item selection
	 * @param event
	 * @param payload
	 */
	onChange(event, payload) {
		let mergedSchema = this.props.schema;
		// with the possibility to have async suggestions, on restricted values inputs
		// the validation doesn't have the enum list as it is not in the jsonSchema
		// so we rebuild it with current titleMap from async call
		if (mergedSchema.restricted && !mergedSchema.schema.enum) {
			mergedSchema = {
				...mergedSchema,
				schema: {
					...mergedSchema.schema,
					enum: this.getTitleMap().map(entry => entry.value),
				},
			};
		}

		const payloadWithSchema = { ...payload, schema: mergedSchema };
		this.callTrigger(event);
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

	getTitleMap() {
		const titleMap =
			this.state.titleMap ||
			get(this.props, 'schema.options.titleMap') ||
			get(this.props, 'schema.titleMap') ||
			[];
		const isMultiSection = get(this.props, 'schema.options.isMultiSection', false);
		const restricted = this.props.schema.restricted;
		const type = this.props.schema.schema.type;
		const propsValue = this.props.value;

		if (restricted || !propsValue) {
			return titleMap;
		}

		let titleMapFind = titleMap;
		const isMultiple = type === 'array';
		const values = isMultiple ? propsValue : [propsValue];

		if (isMultiSection) {
			titleMapFind = titleMap.reduce((prev, current) => {
				prev.push(...current.suggestions);
				return prev;
			}, []);
		}

		const additionalOptions = values
			.filter(value => !titleMapFind.find(option => option.value === value))
			.map(value => this.addCustomValue(value, isMultiSection))
			.reduce((acc, titleMapEntry) => {
				acc.push(titleMapEntry);
				return acc;
			}, []);
		return titleMap.concat(additionalOptions);
	}

	addCustomValue(value, isMultiSection) {
		if (isMultiSection) {
			return {
				title: this.props.t('TF_DATALIST_CUSTOM_SECTION', { defaultValue: 'CUSTOM' }),
				suggestions: [{ name: this.props.resolveName(value), value }],
			};
		}
		return { name: this.props.resolveName(value), value };
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

	render() {
		const props = omit(this.props, PROPS_TO_OMIT);
		const descriptionId = generateDescriptionId(this.props.id);
		const errorId = generateErrorId(this.props.id);
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
				valueIsUpdating={this.props.valueIsUpdating}
			>
				<DataListComponent
					{...props}
					{...this.state}
					className="form-control-container"
					autoFocus={this.props.schema.autoFocus}
					disabled={this.props.schema.disabled || this.props.valueIsUpdating}
					multiSection={get(this.props, 'schema.options.isMultiSection', false)}
					onChange={this.onChange}
					onFocus={this.callTrigger}
					placeholder={this.props.schema.placeholder}
					readOnly={this.props.schema.readOnly || false}
					titleMap={this.getTitleMap()}
					inputProps={{
						'aria-invalid': !this.props.isValid,
						'aria-required': this.props.schema.required,
						'aria-describedby': `${descriptionId} ${errorId}`,
					}}
				/>
			</FieldTemplate>
		);
	}
}

Datalist.displayName = 'Datalist field';
Datalist.defaultProps = {
	resolveName: value => value,
	value: '',
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
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
		valueIsUpdating: PropTypes.bool,
		t: PropTypes.func,
	};
}

export default withTranslation(I18N_DOMAIN_FORMS)(Datalist);
