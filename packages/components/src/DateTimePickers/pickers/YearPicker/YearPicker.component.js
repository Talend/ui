import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Action } from '../../../Actions';
import { buildYears } from '../../generator';
import WithDynamicListGesture from '../../../Gesture/withDynamicListGesture';
import getDefaultT from '../../../translate';

import theme from './YearPicker.scss';

const YEAR_WINDOW_SIZE = 7;
const YEAR_WINDOW_OVERFLOW_SIZE = 3;

class YearPicker extends React.Component {
	static propTypes = {
		selectedYear: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
		t: PropTypes.func.isRequired,
	};

	static defaultProps = {
		t: getDefaultT(),
	};

	constructor(props) {
		super(props);
		this.onWheel = this.onWheel.bind(this);
		this.scrollUp = this.scroll.bind(this, -1, null);
		this.scrollDown = this.scroll.bind(this, 1, null);
		this.goToPreviousPage = this.scroll.bind(this, -YEAR_WINDOW_SIZE);
		this.goToNextPage = this.scroll.bind(this, YEAR_WINDOW_SIZE);

		this.state = { yearsWindow: buildYears(props.selectedYear, YEAR_WINDOW_OVERFLOW_SIZE) };
	}

	componentWillReceiveProps({ selectedYear }) {
		if (
			selectedYear &&
			selectedYear !== this.props.selectedYear &&
			!this.state.yearsWindow.includes(selectedYear)
		) {
			this.setState({ yearsWindow: buildYears(selectedYear, YEAR_WINDOW_OVERFLOW_SIZE) });
		}
	}

	onWheel(event) {
		event.preventDefault();

		// Magical calculation to simulate a cool scroll, sorry for that
		const { deltaY } = event;
		const absolutePace = Math.round(Math.log(Math.abs(deltaY)));
		let pace = deltaY > 0 ? 1 : -1; // init with the sign
		if (absolutePace >= 5) {
			pace *= Math.floor(absolutePace / 2);
		}
		this.scroll(pace);
	}

	getMiddleYear() {
		const { yearsWindow } = this.state;
		return yearsWindow[Math.floor(yearsWindow.length / 2)];
	}

	scroll(pace, callback) {
		this.setState(
			() => ({
				yearsWindow: buildYears(this.getMiddleYear() + pace, YEAR_WINDOW_OVERFLOW_SIZE),
			}),
			callback,
		);
	}

	render() {
		const { selectedYear, t } = this.props;
		const { yearsWindow } = this.state;
		const selectedIsInWindow = yearsWindow.includes(selectedYear);
		const middleYear = this.getMiddleYear();
		return (
			<WithDynamicListGesture
				className={theme['year-picker']}
				goToPreviousPage={this.goToPreviousPage}
				goToNextPage={this.goToNextPage}
			>
				{onKeyDown => [
					<Action
						key="previousPage"
						className={classnames(theme.scroll, theme['scroll-up'], 'tc-date-picker-scroll-up')}
						icon="talend-chevron-left"
						iconTransform="rotate-90"
						label={t('DATEPICKER_YEAR_PREVIOUS', { defaultValue: 'Go to previous year' })}
						onClick={this.scrollUp}
						link
						hideLabel
					/>,
					<ol key="list" onWheel={this.onWheel}>
						{yearsWindow.map((year, index) => {
							const isSelectedYear = year === selectedYear;
							let tabIndex = -1;
							if (isSelectedYear || (!selectedIsInWindow && year === middleYear)) {
								tabIndex = 0;
							}

							let ariaLabel;
							const liProps = {};
							if (isSelectedYear) {
								liProps['aria-current'] = true;
								ariaLabel = t('DATEPICKER_YEAR_SELECTED', {
									defaultValue: '{{year}}, selected',
									year,
								});
							}

							const classNames = classnames(
								theme.year,
								{ [theme.selected]: isSelectedYear },
								'tc-date-picker-year',
							);
							return (
								<li {...liProps} key={year}>
									<button
										type="button"
										className={classNames}
										onClick={event => this.props.onSelect(event, year)}
										tabIndex={tabIndex}
										onKeyDown={event => onKeyDown(event, { index, size: YEAR_WINDOW_SIZE })}
										aria-label={ariaLabel}
									>
										{year}
									</button>
								</li>
							);
						})}
					</ol>,
					<Action
						key="nextPage"
						className={classnames(theme.scroll, theme['scroll-down'], 'tc-date-picker-scroll-down')}
						icon="talend-chevron-left"
						iconTransform="rotate-270"
						label={t('DATEPICKER_YEAR_NEXT', { defaultValue: 'Go to next year' })}
						onClick={this.scrollDown}
						link
						hideLabel
					/>,
				]}
			</WithDynamicListGesture>
		);
	}
}

export default YearPicker;
