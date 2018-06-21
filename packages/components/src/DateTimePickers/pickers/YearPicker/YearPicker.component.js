import React from 'react';
import PropTypes from 'prop-types';
import theme from './YearPicker.scss';
import IconButton from '../../IconButton';
import PickerAction from '../../PickerAction';

class YearPicker extends React.Component {

	constructor(props) {
		super(props);

		const now = new Date();
		const middleYear = props.selectedYear !== undefined
			? props.selectedYear
			: now.getFullYear();

		const firstYear = middleYear - 2;

		this.years = (new Array(5))
			.fill(0)
			.map((_, i) => firstYear + i);
	}

	render() {
		const isSelected = year =>
			year === this.props.selectedYear;

		const onSelect = year => {
			if (this.props.onSelect === undefined) {
				return undefined;
			}

			return () => {
				this.props.onSelect(year);
			};
		};

		return (
			<div className={theme.container}>
				<IconButton
					icon={{
						name: 'talend-chevron-left',
						transform: 'rotate-90',
					}}
					className={theme['action-up']}
					aria-label="Scroll to previous years"
				/>
				<div className={theme.years}>
					{this.years.map(year =>
						<div
							key={year}
							className={theme.year}
						>
							<PickerAction
								aria-label={`Select '${year}'`}
								isSelected={isSelected(year)}
								label={year.toString()}
								onClick={onSelect(year)}
							/>
						</div>
					)}
				</div>
				<IconButton
					icon={{
						name: 'talend-chevron-left',
						transform: 'rotate-270',
					}}
					className={theme['action-down']}
					aria-label="Scroll to next years"
				/>
			</div>
		);
	}
}

YearPicker.propTypes = {
	selectedYear: PropTypes.number,
	onSelect: PropTypes.func,
};

export default YearPicker;
