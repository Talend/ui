import PropTypes from 'prop-types';
import React from 'react';
import MultiSelect from '@talend/react-components/lib/MultiSelect';
import FieldTemplate from '../FieldTemplate';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

import callTrigger from '../../trigger';

function getLabel(titleMap, value, defaultName) {
	const itemConf = titleMap.find(item => item.value === value);
	if (itemConf) {
		return itemConf.name;
	}
	return defaultName || value;
}

export default class MultiSelectField extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selected: props.value };
		this.onTrigger = this.onTrigger.bind(this);
		this.onChange = this.onChange.bind(this);
		this.getTitleMap = this.getTitleMap.bind(this);
	}

	componentDidMount() {
		this.onTrigger({ type: 'didMount' });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			// reset selected
			this.setState({ selected: nextProps.value });
		}
	}

	onTrigger(event) {
		callTrigger(event, {
			eventNames: [event.type],
			triggersDefinitions: this.props.schema.triggers,
			onTrigger: this.onTrigger,
			onLoading: isLoading => this.setState({ isLoading }),
			onResponse: data => this.setState(data),
		});
	}

	onChange(event, selected) {
		this.setState({ selected });
	}

	getTitleMap() {
		return this.props.schema.titleMap;
	}

	render() {
		const { id, isValid, errorMessage, schema } = this.props;
		// const names = this.props.resolveName(this.props.value);
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);

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
				<MultiSelect
					id={id}
					autoFocus={schema.autoFocus}
					disabled={schema.disabled}
					required={schema.required}
					placeholder={schema.placeholder}
					readOnly={schema.readOnly}
					onBlur={this.onTrigger}
					onChange={this.onChange}
					onFocus={this.onTrigger}
					titleMap={this.getTitleMap()}
					selected={this.state.selected}
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
		resolveName: PropTypes.func,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		onTrigger: PropTypes.func.isRequired,
		properties: PropTypes.object,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
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
	resolveName: value => value,
	schema: {},
	value: [],
};
