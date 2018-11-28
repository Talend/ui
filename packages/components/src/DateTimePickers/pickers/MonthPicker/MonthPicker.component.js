import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { buildMonths } from '../../generator';

import theme from './MonthPicker.scss';
import { withMonthCalendarGesture } from '../../../Gesture/withCalendarGesture';

const ROW_SIZE = 3;

class MonthPicker extends React.PureComponent {
	constructor(props) {
		super(props);
		this.months = buildMonths(ROW_SIZE, props.t);
	}

	render() {
		return (
			<table
				className={theme.container}
				ref={ref => {
					this.monthPickerRef = ref;
				}}
			>
				<caption className="sr-only">TODO: caption, month aria-label</caption>
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

								const tdProps = {
									key: index,
									className: theme['calendar-col'],
								};
								if (isSelected) {
									tdProps['aria-current'] = 'date';
								}
								return (
									<td key={index} {...tdProps}>
										<button
											type="button"
											className={className}
											onClick={event => {
												this.props.onSelect(event, index);
											}}
											tabIndex={this.props.allowFocus && isSelected ? 0 : -1}
											onKeyDown={event => this.props.onKeyDown(event, this.monthPickerRef, index)}
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
	t: PropTypes.func,
};

export default withMonthCalendarGesture(MonthPicker, ROW_SIZE);
