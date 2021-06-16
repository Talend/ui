import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { buildMonths } from '../../generator';

import theme from './MonthPicker.scss';
import { withMonthCalendarGesture } from '../../../Gesture/withCalendarGesture';
import getDefaultT from '../../../translate';

const ROW_SIZE = 3;

class MonthPicker extends React.PureComponent {
	constructor(props) {
		super(props);
		this.months = buildMonths(ROW_SIZE, props.t);
	}

	render() {
		const { t, selectedYear } = this.props;

		return (
			<table
				className={theme.container}
				ref={ref => {
					this.monthPickerRef = ref;
				}}
			>
				<caption className="sr-only">
					{t('DATEPICKER_MONTHS_TITLE', { defaultValue: 'Year {{year}}', year: selectedYear })}
				</caption>
				<tbody>
					{this.months.map((monthsRow, i) => (
						<tr key={i} className={theme['calendar-row']}>
							{monthsRow.map(({ index, name }) => {
								const isSelected = index === this.props.selectedMonthIndex;
								const className = classNames(
									theme['calendar-month'],
									{ [theme.selected]: isSelected },
									'tc-date-picker-month',
								);

								let ariaLabel = `${name} ${selectedYear}`;
								const tdProps = {
									key: index,
									className: theme['calendar-col'],
								};
								if (isSelected) {
									tdProps['aria-current'] = 'date';
									ariaLabel = t('DATEPICKER_SELECTED_MONTH', {
										defaultValue: '{{monthYear}}, selected',
										monthYear: ariaLabel,
									});
								}
								return (
									<td key={index} {...tdProps}>
										<button
											data-value={index}
											type="button"
											className={className}
											onClick={event => {
												this.props.onSelect(event, index);
											}}
											tabIndex={this.props.allowFocus && isSelected ? 0 : -1}
											onKeyDown={event => this.props.onKeyDown(event, this.monthPickerRef, index)}
											aria-label={ariaLabel}
										>
											{name}
										</button>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
MonthPicker.displayName = 'MonthPicker';
MonthPicker.propTypes = {
	allowFocus: PropTypes.bool,
	onKeyDown: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	selectedMonthIndex: PropTypes.number,
	selectedYear: PropTypes.number,
	t: PropTypes.func,
};
MonthPicker.defaultProps = {
	t: getDefaultT(),
};

export default withMonthCalendarGesture(MonthPicker, ROW_SIZE);
