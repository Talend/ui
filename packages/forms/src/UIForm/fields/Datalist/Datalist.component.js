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

const STATE_TO_OMIT = [
	'added',
];

const SCHEMA_TO_OMIT = [
	'type',
	'triggers',
	'title',
	'titleMap',
	'schema',
];


class Datalist extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	componentDidMount() {
		if (this.props.value && !this.props.schema.titleMap) {
			this.onFocus({ type: 'mount' });
		}
	}
	/**
	 * On change callback
	 * We call onFinish to trigger validation on datalist item selection
	 * @param event
	 * @param payload
	 */
	onChange(event, payload) {
		const payloadWithSchema = { ...payload, schema: this.props.schema };
		this.props.onChange(event, payloadWithSchema);
		this.props.onFinish(event, payloadWithSchema);
	}

	onFocus(event) {
		if (this.props.schema.triggers) {
			this.props.schema.triggers.forEach(trigger => {
				if (trigger.onEvent === 'focus') {
					this.setState({ isLoading: true });
					this.props.onTrigger(event, this.props).then(data => {
						this.setState({
							isLoading: false,
							...data,
						});
					});
				}
			});
		}
	}

	getTitleMap() {
		let titleMap = [];
		if (this.state.titleMap) {
			titleMap = Array.from(this.state.titleMap);
		} else if (this.props.schema.titleMap) {
			titleMap = Array.from(this.props.schema.titleMap);
		}
		const isMultiple = this.isMultiple();
		if (this.props.value && !isMultiple) {
			if (!titleMap.find(option => option.value === this.props.value)) {
				titleMap.push({ name: this.props.value, value: this.props.value });
			}
		} else if (this.props.value && isMultiple) {
			this.props.value.forEach(value => {
				if (!titleMap.find(option => option.value === value)) {
					titleMap.push({ name: this.props.value, value: this.props.value });
				}
			});
		}

		return titleMap;
	}

	isMultiple() {
		return this.props.schema.schema.type === 'array';
	}

	render() {
		const props = omit(this.props, PROPS_TO_OMIT);
		Object.assign(props, omit(this.state, STATE_TO_OMIT));
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
