import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataListComponent from '@talend/react-components/lib/Datalist';
import omit from 'lodash/omit';
import FieldTemplate from '../FieldTemplate';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PROPS_TO_OMIT = [
	'classNames',
	'schema',
	'getComponent',
	'errorMessage',
	'isValid',
	'onChange',
	'onFinish',
	'onTrigger',
	't',
];

const SCHEMA_TO_OMIT = ['type', 'triggers', 'title', 'titleMap', 'schema'];

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.getTitleMap = this.getTitleMap.bind(this);
		this.isMultiple = this.isMultiple.bind(this);
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

	onFocus(event) {
		this.callTrigger(event);
	}

	onBlur(event) {
		this.callTrigger(event);
	}

	getTitleMap() {
		let titleMap;
		if (this.state.titleMap) {
			titleMap = this.state.titleMap;
		} else if (this.props.schema.titleMap) {
			titleMap = this.props.schema.titleMap;
		} else {
			titleMap = [];
		}

		const values = this.isMultiple() ? this.props.value : [this.props.value];
		const optionNotExists = value => titleMap.find(option => option.value === value);
		const additionalOptions = values.filter(optionNotExists).reduce((acc, value) => {
			acc.push({ name: value, value });
			return acc;
		}, []);
		// console.log({ additionalOptions });
		return titleMap.concat(additionalOptions);
	}

	isMultiple() {
		return this.props.schema.schema.type === 'array';
	}

	callTrigger(event) {
		if (this.props.schema.triggers) {
			const trigger = this.props.schema.triggers.find(t => t.onEvent === event.type);
			if (trigger) {
				this.setState({ isLoading: true });
				this.props.onTrigger(event, {
					trigger,
					schema: this.props.schema,
					errors: this.props.errors,
					properties: this.props.properties,
				}).then(data => {
					this.setState({
						isLoading: false,
						...data,
					});
				}, () => {
					this.setState({ isLoading: false });
				});
			}
		}
	}

	render() {
		const props = omit(this.props, PROPS_TO_OMIT);
		Object.assign(props, this.state);
		Object.assign(props, omit(this.props.schema, SCHEMA_TO_OMIT));
		props.titleMap = this.getTitleMap();
		if (props.id) {
			props.id = `${props.id}-select`;
		}
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
					input
					multiSection={false}
					onChange={this.onChange}
					onFocus={this.onFocus}
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
