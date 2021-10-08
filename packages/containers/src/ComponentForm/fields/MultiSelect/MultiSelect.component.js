import PropTypes from 'prop-types';
import React from 'react';
import MultiSelect from '@talend/react-components/lib/MultiSelect';
import Form from '@talend/react-forms';

const FieldTemplate = Form.UIForm.FieldTemplate;

export default class MultiSelectField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onTrigger = this.onTrigger.bind(this);
		this.onTriggerResult = this.onTriggerResult.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getTitleMap = this.getTitleMap.bind(this);
	}

	componentDidMount() {
		this.onTrigger({ type: 'didMount' });
	}

	onTrigger(event) {
		Form.UIForm.callTrigger(event, {
			eventNames: [event.type],
			triggersDefinitions: this.props.schema.triggers,
			onTrigger: this.onTriggerResult,
			onLoading: isLoading => this.setState({ isLoading }),
			onResponse: data => this.setState(data),
		});
	}

	onTriggerResult(event, trigger) {
		return this.props.onTrigger(event, {
			trigger,
			schema: this.props.schema,
			errors: this.props.errors,
			properties: this.props.properties,
		});
	}

	onChange(event, selected) {
		const payload = {
			schema: { ...this.props.schema, titleMap: this.getTitleMap() },
			value: selected,
		};
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	getTitleMap() {
		if (this.state.titleMap) {
			return this.state.titleMap;
		}

		const { titleMap } = this.props.schema;
		if (titleMap && Object.keys(titleMap).length > 0) {
			return titleMap;
		}

		const { value = [] } = this.props;
		const names = this.props.resolveName(value);
		return value.map((nextVal, index) => ({
			name: names[index],
			value: nextVal,
		}));
	}

	getChildrenErrorMessage() {
		const { errors } = this.props.errors;
		if (!errors || errors.length === 0) {
			return undefined;
		}

		const key = this.props.schema.key.toString();
		return Object.entries(errors)
			.filter(entry => entry[0].startsWith(key))
			.map(entry => entry[1])
			.join(', ');
	}

	render() {
		const { generateDescriptionId, generateErrorId } = Form.UIForm.Message.utils;
		const { id, isValid, errorMessage, schema } = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const errorMsg = errorMessage || this.getChildrenErrorMessage();
		const isDeepValid = isValid && !errorMsg;

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={errorMsg}
				id={id}
				isValid={isDeepValid}
				label={schema.title}
				required={schema.required}
			>
				<MultiSelect
					id={id}
					autoFocus={schema.autoFocus}
					disabled={schema.disabled}
					required={schema.required}
					placeholder={schema.placeholder}
					readOnly={schema.readOnly}
					restricted={schema.restricted}
					onBlur={this.onTrigger}
					onChange={this.onChange}
					onFocus={this.onTrigger}
					options={this.getTitleMap()}
					selected={this.props.value}
					isLoading={this.state.isLoading}
				/>
			</FieldTemplate>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	MultiSelectField.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		errors: PropTypes.object,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onTrigger: PropTypes.func.isRequired,
		properties: PropTypes.object,
		resolveName: PropTypes.func,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			key: PropTypes.array,
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
			triggers: PropTypes.arrayOf(
				PropTypes.shape({
					onEvent: PropTypes.string,
				}),
			),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

MultiSelectField.defaultProps = {
	isValid: true,
	schema: {},
	value: [],
	resolveName: value => value,
};
