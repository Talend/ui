import React from 'react';
import PropTypes from 'prop-types';
import InputDateTimePickerComponent from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';

class InputDateTimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	/**
	 * On change callback
	 * We call onFinish to trigger validation
	 * @param date
	 * @param payload
	 */
	onChange(date) {
		const payload = {
			schema: this.props.schema,
			value: date,
		};
		this.props.onChange(null, payload);
		this.props.onFinish(null, payload);
	}

	render() {
		const { schema } = this.props;
		return (
			<FieldTemplate
				description={schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
				label={schema.title}
				required={schema.required}
			>
				<InputDateTimePickerComponent
					selectedDateTime={this.props.value}
					onChange={this.onChange}
				/>
			</FieldTemplate>
		);
	}
}

InputDateTimePicker.displayName = 'Widget(InputDateTimePicker)';
InputDateTimePicker.defaultProps = {
	value: undefined,
};

if (process.env.NODE_ENV !== 'production') {
	InputDateTimePicker.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	};
}

export default InputDateTimePicker;
