import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataListComponent from '@talend/react-components/lib/Datalist';
import omit from 'lodash/omit';
import FieldTemplate from '../FieldTemplate';
import { getValue } from '../../utils/properties';

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

const SCHEMA_TO_OMIT = ['type', 'triggers', 'title', 'titleMap', 'schema'];

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
		this.getTitleMap = this.getTitleMap.bind(this);
		this.callTrigger = this.callTrigger.bind(this);
	}

	componentDidMount() {
		this.callTrigger({ type: 'didMount' });
	}
	/**
	 * On change callback
	 * We call onFinish to trigger validation on datalist item selection
	 * @param event
	 * @param payload
	 */
	onChange(event, payload) {
		const payloadWithSchema = { ...payload, schema: this.props.schema };
		this.callTrigger(event);
		this.props.onChange(event, payloadWithSchema);
		this.props.onFinish(event, payloadWithSchema);
	}

	getTitleMap() {
		let titleMap;
		if (this.state.titleMap) {
			titleMap = this.state.titleMap;
		} else if (this.props.schema.titleMap) {
			titleMap = this.props.schema.titleMap;
		} else {
			// create schema to get entry name from internal properties
			const key = Array.from(this.props.schema.key);
			key[key.length - 1] = `$${key[key.length - 1]}_name`;

			const nameSchema = Object.assign({}, this.props.schema, { key });
			const value = this.props.value;
			//TODO here it should be value = original, not any modified one
			titleMap = [{ name: getValue(this.props.properties, nameSchema) || value, value }];
		}

		const isMultiple = this.props.schema.schema.type === 'array';
		const values = isMultiple ? this.props.value : [this.props.value];
		const additionalOptions = values
			.filter(value => value)
			.filter(value => !titleMap.find(option => option.value === value))
			.reduce((acc, value) => {
				acc.push({ name: value, value });
				return acc;
			}, []);

		return titleMap.concat(additionalOptions);
	}

	callTrigger(event) {
		const trigger =
			this.props.schema.triggers && this.props.schema.triggers.find(t => t.onEvent === event.type);
		if (!trigger) {
			return;
		}
		const onError = () => {
			this.setState({ isLoading: false });
		};
		const onResponse = data => {
			this.setState({
				isLoading: false,
				...data,
			});
		};
		this.setState({ isLoading: true });
		this.props
			.onTrigger(event, {
				trigger,
				schema: this.props.schema,
				errors: this.props.errors,
				properties: this.props.properties,
			})
			.then(onResponse, onError);
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
					titleMap={this.getTitleMap()}
					input
					multiSection={false}
					onChange={this.onChange}
					onFocus={this.callTrigger}
				/>
			</FieldTemplate>
		);
	}
}

Datalist.displayName = 'Datalist field';
Datalist.defaultProps = {
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
