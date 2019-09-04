import React from 'react';
import PropTypes from 'prop-types';

import { DateContext } from '../Context';
import {
	checkSupportedDateFormat,
	extractDate,
	extractPartsFromDate,
	extractDateFromTextInput,
} from '../date-extraction';

import {
	INPUT_ERRORS,
} from '../constants';

class ContextualManager extends React.Component {
	static displayName = 'Date.Manager';
	static propTypes = {
		children: PropTypes.node,
		dateFormat: PropTypes.string,
		onChange: PropTypes.func,
		required: PropTypes.bool,
		selectedDate: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.number,
			PropTypes.string,
		]),
		useUTC: PropTypes.bool,
	};

	static defaultProps = {
		dateFormat: 'YYYY-MM-DD',
		useUTC: false,
	};

	constructor(props) {
		super(props);

		checkSupportedDateFormat(props.dateFormat);
		this.state = extractDate(props.selectedDate, this.getDateOptions());

		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const newselectedDate = nextProps.selectedDate;

		const needDateStateUpdate =
			newselectedDate !== this.props.selectedDate && // selectedDate props updated
			newselectedDate !== this.state.date; // not the same ref as state date

		if (nextProps.dateFormat !== this.props.dateFormat) {
			checkSupportedDateFormat(nextProps.dateFormat);
		}

		if (needDateStateUpdate) {
			const dateRelatedPartState = extractDate(newselectedDate, this.getDateOptions());
			this.setState(dateRelatedPartState);
		}
	}

	onChange(event, origin) {
		if (!this.props.onChange) {
			return;
		}
		const { errorMessage, date, textInput, errors } = this.state;
		this.props.onChange(event, { errors, errorMessage, date, textInput, origin });
	}

	onInputChange(event) {
		const textInput = event.target.value;
		const nextState = extractDateFromTextInput(textInput, this.getDateOptions());
		this.setState(nextState, () => {
			this.onChange(event, 'INPUT');
		});
	}

	onPickerChange(event, { date }) {
		const nextState = extractPartsFromDate(date, this.getDateOptions());

		const nextErrors = this.state.errors
			.filter(error => !INPUT_ERRORS.includes(error.code))
			.concat(nextState.errors.filter(error => INPUT_ERRORS.includes(error.code)));

		this.setState({ ...nextState, errors: nextErrors }, () => {
			this.onChange(event, 'PICKER');
		});
	}

	getDateOptions() {
		return {
			dateFormat: this.props.dateFormat,
			useUTC: this.props.useUTC,
			required: this.props.required,
		};
	}

	render() {
		return (
			<DateContext.Provider
				value={{
					value: {
						textInput: this.state.textInput,
						date: this.state.date,
					},

					inputManagement: {
						onChange: this.onInputChange,
						placeholder: this.props.dateFormat,
					},

					pickerManagement: {
						onSubmit: this.onPickerChange,
						useUTC: this.props.useUTC,
					},
				}}
			>
				{this.props.children}
			</DateContext.Provider>
		);
	}
}
export default ContextualManager;
