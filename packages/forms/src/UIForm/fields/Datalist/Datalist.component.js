import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataListComponent from '@talend/react-components/lib/Datalist';
import omit from 'lodash/omit';
import FieldTemplate from '../FieldTemplate';
import callTrigger from './Datalist.trigger';
import { DID_MOUNT } from './constants';

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
		const titleMap = this.state.titleMap || this.props.schema.titleMap || [];

		if (!this.props.schema.restricted) {
			const isMultiple = this.props.schema.schema.type === 'array';
			const values = isMultiple ? this.props.value : [this.props.value];
			const additionalOptions = values
				.filter(value => value)
				.filter(value => !titleMap.find(option => option.value === value))
				.map(value => ({ name: this.props.resolveName(value), value }))
				.reduce((acc, titleMapEntry) => {
					acc.push(titleMapEntry);
					return acc;
				}, []);
			return titleMap.concat(additionalOptions);
		}

		return titleMap;
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
		return (
			<FieldTemplate
				description={this.props.schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={this.props.schema.title}
				required={this.props.schema.required}
			>
				<DataListComponent
					{...props}
					{...this.state}
					autoFocus={this.props.schema.autoFocus}
					disabled={this.props.schema.disabled || false}
					multiSection={false}
					onChange={this.onChange}
					onFocus={this.callTrigger}
					placeholder={this.props.schema.placeholder}
					readOnly={this.props.schema.readOnly || false}
					titleMap={this.getTitleMap()}
				/>
			</FieldTemplate>
		);
	}
}

Datalist.displayName = 'Datalist field';
Datalist.defaultProps = {
	resolveName: value => value,
	value: '',
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
		}),
		value: PropTypes.string,
	};
}

export default Datalist;
