import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid';
import DebounceInput from 'react-debounce-input';
import getDefaultT from '../../../translate';
import { DateTimePickerErrorConsumer } from '../../InputDateTimePicker';

import theme from './TimePicker.scss';

const HOURS = 'HOURS';
const MINUTES = 'MINUTES';
const SECONDS = 'SECONDS';

class TimePicker extends React.PureComponent {
	static defaultProps = {
		value: {},
		t: getDefaultT(),
	};

	static propTypes = {
		allowFocus: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.shape({
			hours: PropTypes.string,
			minutes: PropTypes.string,
			seconds: PropTypes.string,
		}),
		useSeconds: PropTypes.bool,
		useUTC: PropTypes.bool,
		t: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		const id = uuid.v4();
		this.hourId = `${id}-hour`;
		this.minuteId = `${id}-minute`;
		this.secondId = `${id}-second`;
		this.onChange = this.onChange.bind(this);
	}

	onChange(event, field) {
		const inputValue = event.target.value;
		const newValue = { ...this.props.value };
		if (field === HOURS) {
			newValue.hours = inputValue;
		} else if (field === MINUTES) {
			newValue.minutes = inputValue;
		} else if (field === SECONDS) {
			newValue.seconds = inputValue;
		}
		this.props.onChange(event, newValue);
	}

	renderSeconds(tabIndex, hasError, formMode, secondsErrorId, focusInput) {
		if (this.props.useSeconds) {
			return [
				<hr key="hr-seconds" />,
				<label key="label-seconds" htmlFor={this.secondId} className="sr-only">
					{this.props.t('DATEPICKER_TIME_SECONDS', { defaultValue: 'Seconds' })}
				</label>,
				<DebounceInput
					key="input-seconds"
					id={this.secondId}
					className={classNames(theme['time-input'], {
						[theme['time-error']]: hasError('INVALID_SECONDS'),
					})}
					value={this.props.value.seconds}
					tabIndex={tabIndex}
					onBlur={() => focusInput()}
					onFocus={() => focusInput(secondsErrorId)}
					onChange={event => this.onChange(event, SECONDS)}
					placeholder="SS"
					aria-required={formMode}
					aria-invalid={hasError('INVALID_SECONDS')}
					aria-describedby={hasError('INVALID_SECONDS') ? secondsErrorId : ''}
				/>,
			];
		}
		return null;
	}

	render() {
		const { t } = this.props;
		const tabIndex = this.props.allowFocus ? 0 : -1;

		return (
			<DateTimePickerErrorConsumer>
				{({ focusInput, hasError, formMode, hoursErrorId, minutesErrorId, secondsErrorId }) => (
					<div className={classNames('tc-date-picker-time', theme['time-picker'])}>
						<legend>
							{t('DATEPICKER_TIME', { defaultValue: 'Time' })}
							{this.props.useUTC ? (
								<div key="utc" className={theme.utc}>
									{t('DATEPICKER_UTC', { defaultValue: 'UTC' })}
								</div>
							) : null}
						</legend>
						<label htmlFor={this.hourId} className="sr-only">
							{t('DATEPICKER_TIME_HOURS', { defaultValue: 'Hours' })}
						</label>
						<DebounceInput
							id={this.hourId}
							className={classNames(theme['time-input'], {
								[theme['time-error']]: hasError('INVALID_HOUR'),
							})}
							value={this.props.value.hours}
							tabIndex={tabIndex}
							onChange={event => this.onChange(event, HOURS)}
							onBlur={() => focusInput()}
							onFocus={() => focusInput(hoursErrorId)}
							placeholder="HH"
							aria-required={formMode}
							aria-invalid={hasError('INVALID_HOUR')}
							aria-describedby={hasError('INVALID_HOUR') ? hoursErrorId : ''}
						/>
						<hr />
						<label htmlFor={this.minuteId} className="sr-only">
							{t('DATEPICKER_TIME_MINUTES', { defaultValue: 'Minutes' })}
						</label>
						<DebounceInput
							id={this.minuteId}
							className={classNames(theme['time-input'], {
								[theme['time-error']]: hasError('INVALID_MINUTES'),
							})}
							value={this.props.value.minutes}
							tabIndex={tabIndex}
							onChange={event => this.onChange(event, MINUTES)}
							onBlur={() => focusInput()}
							onFocus={() => focusInput(minutesErrorId)}
							placeholder="MM"
							aria-required={formMode}
							aria-invalid={hasError('INVALID_MINUTES')}
							aria-describedby={hasError('INVALID_MINUTES') ? minutesErrorId : ''}
						/>
						{this.renderSeconds(tabIndex, hasError, formMode, secondsErrorId, focusInput)}
					</div>
				)}
			</DateTimePickerErrorConsumer>
		);
	}
}

export default TimePicker;
