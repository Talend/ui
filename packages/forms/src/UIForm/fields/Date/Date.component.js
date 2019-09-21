import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import InputDateTimePicker from '@talend/react-components/lib/DateTimePickers';
import FieldTemplate from '../FieldTemplate';
import { isoDateTimeRegExp } from '../../customFormats';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';

const INVALID_DATE = new Date('');

function isoStrToDate(isoStr) {
	if (isoDateTimeRegExp.test(isoStr)) {
		return new Date(isoStr);
	}
	return INVALID_DATE;
}

function dateToIsoStr(date) {
	return date.toISOString();
}

class DateWidget extends React.Component {
	constructor(props) {
		super(props);
		this.state = { errorMessage: '' };

		this.isoStrToDate = memoizeOne(isoStrToDate);
		this.dateToIsoStr = memoizeOne(dateToIsoStr);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(event, { errorMessage, datetime, textInput }) {
		this.setState({ errorMessage });
		let value = datetime;
		if (!errorMessage && datetime) {
			const { schema } = this.props.schema;
			if (schema.format === 'iso-datetime') {
				value = this.dateToIsoStr(datetime);
			} else if (schema.type === 'number') {
				value = datetime.getTime();
			} else {
				value = textInput;
			}
		}

		const payload = {
			schema: this.props.schema,
			value,
		};
		this.props.onChange(event, payload);

		if (!errorMessage) {
			this.props.onFinish(event, payload);
		}
	}

	onBlur(event) {
		this.props.onFinish(event, { schema: this.props.schema });
	}

	render() {
		const {
			errorMessage,
			id,
			isValid,
			options,
			schema,
			useSeconds,
			value,
			valueIsUpdating,
		} = this.props;
		const descriptionId = generateDescriptionId(id);
		const errorId = generateErrorId(id);
		const convertedValue = schema.format === 'iso-datetime' ? this.isoStrToDate(value) : value;

		return (
			<FieldTemplate
				description={schema.description}
				descriptionId={descriptionId}
				errorId={errorId}
				errorMessage={this.state.errorMessage || errorMessage}
				id={id}
				isValid={isValid}
				label={schema.title}
				required={schema.required}
				valueIsUpdating={valueIsUpdating}
			>
				<InputDateTimePicker
					autoFocus={schema.autoFocus}
					dateFormat={options.dateFormat}
					disabled={schema.disabled || valueIsUpdating}
					id={id}
					onChange={this.onChange}
					onBlur={this.onBlur}
					placeholder={schema.placeholder}
					readOnly={schema.readOnly}
					value={convertedValue}
					useSeconds={useSeconds}
					useUTC={options.useUTC}
					// eslint-disable-next-line jsx-a11y/aria-proptypes
					aria-invalid={!isValid}
					aria-required={schema.required}
					aria-describedby={`${descriptionId} ${errorId}`}
				/>
			</FieldTemplate>
		);
	}
}

DateWidget.displayName = 'Date Widget';
DateWidget.defaultProps = {
	options: {},
};

if (process.env.NODE_ENV !== 'production') {
	DateWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		options: PropTypes.shape({
			dateFormat: PropTypes.string,
		}),
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			format: PropTypes.string,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			schema: PropTypes.shape({
				type: PropTypes.string,
			}),
		}),
		useTime: PropTypes.bool,
		useSeconds: PropTypes.bool,
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)]),
		valueIsUpdating: PropTypes.bool,
	};
}

export default DateWidget;
