import React from 'react';
import PropTypes from 'prop-types';
import isSameSecond from 'date-fns/is_same_second';

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
		this.initialState = extractDate(props.selectedDate, this.getDateOptions());
		this.state = {
			...this.initialState,
			previousErrors: [],
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onPickerChange = this.onPickerChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const newselectedDate = nextProps.selectedDate;

		const needDateTimeStateUpdate =
			newselectedDate !== this.props.selectedDate && // selectedDate props updated
			newselectedDate !== this.state.datetime && // not the same ref as state date time
			!isSameSecond(newselectedDate, this.state.datetime); // not the same value as state

		if (nextProps.dateFormat !== this.props.dateFormat) {
			checkSupportedDateFormat(nextProps.dateFormat);
		}

		if (needDateTimeStateUpdate) {
			const dateRelatedPartState = extractDate(newselectedDate, this.getDateOptions());
			this.setState(dateRelatedPartState);
		}
	}

	onChange(event, origin) {
		if (!this.props.onChange) {
			return;
		}
		const { errorMessage, date, textInput, errors } = this.state;
		// we need to update the initial state once it has been changed
		this.initialState = { ...this.state };
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

		// we need to retrieve the input error from nextState to add them to the current one
		// because, by changing the picker, we update the textInput so we need to update its errors
		const nextErrors = this.state.errors
			// remove old main input errors
			.filter(error => !INPUT_ERRORS.includes(error.code))
			// add new main input errors
			.concat(nextState.errors.filter(error => INPUT_ERRORS.includes(error.code)));

		this.setState({ previousErrors: this.state.errors, ...nextState, errors: nextErrors }, () => {
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
						inputRef: ref => {
							this.inputRef = ref;
						},
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
