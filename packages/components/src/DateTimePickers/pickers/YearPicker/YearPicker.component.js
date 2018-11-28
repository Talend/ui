import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Action } from '../../../Actions';
import { buildYears } from '../../generator';
import getDefaultT from '../../../translate';

import theme from './YearPicker.scss';

class YearPicker extends React.Component {

	static propTypes = {
		selectedYear: PropTypes.number,
		onSelect: PropTypes.func.isRequired,
	};

	static defaultProps = {
		t: getDefaultT(),
	};

	constructor(props) {
		super(props);
		this.onWheel = this.onWheel.bind(this);
		this.scrollUp = this.scroll.bind(this, -1);
		this.scrollDown = this.scroll.bind(this, 1);

		this.state = { yearsWindow: buildYears(props.selectedYear) };
	}

	componentWillReceiveProps({ selectedYear }) {
		if (
			selectedYear &&
			selectedYear !== this.props.selectedYear &&
			!this.state.yearsWindow.includes(selectedYear)
		) {
			this.setState({ yearsWindow: buildYears(selectedYear) });
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

	scroll(pace) {
		this.setState(() => ({ yearsWindow: buildYears(this.getMiddleYear() + pace) }));
	}

	render() {
		const { selectedYear, t } = this.props;
		const { yearsWindow } = this.state;
		const selectedIsInWindow = yearsWindow.includes(selectedYear);
		const middleYear = this.getMiddleYear();
		return (
			<div className={theme['year-picker']}>
				<Action
					className={classnames(theme.scroll, theme['scroll-up'], 'tc-date-picker-scroll-up')}
					icon="talend-chevron-left"
					iconTransform="rotate-90"
					label={ t('YEAR_PICKER_PREVIOUS', { defaultValue: 'Go to previous year' }) }
					onClick={this.scrollUp}
					tabIndex="-1"
					link
					hideLabel
				/>
				<ol onWheel={this.onWheel}>
					{yearsWindow.map((year, index) => {
						const isSelectedYear = year === selectedYear;
						let tabIndex = -1;
						if (isSelectedYear || (!selectedIsInWindow && index === middleYear)) {
							tabIndex = 0;
						}

						const liProps = {};
						if (isSelectedYear) {
							liProps['aria-current'] = true;
						}

						const classNames = classnames(
							theme.year,
							{ [theme.selected]: isSelectedYear },
							'tc-date-picker-year',
						);
						return (
							<li {...liProps} key={year}>
								<button
									className={classNames}
									onClick={event => this.props.onSelect(event, year)}
									tabIndex={tabIndex}
								>
									{year}
								</button>
							</li>
						);
					})}
				</ol>
				<Action
					className={classnames(theme.scroll, theme['scroll-down'], 'tc-date-picker-scroll-down')}
					icon="talend-chevron-left"
					iconTransform="rotate-270"
					label={ t('YEAR_PICKER_NEXT', { defaultValue: 'Go to next year' }) }
					onClick={this.scrollDown}
					tabIndex="-1"
					link
					hideLabel
				/>
			</div>
		);
	}
}

export default YearPicker;
