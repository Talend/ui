import PropTypes from 'prop-types';
import React from 'react';
import RcSlider from 'rc-slider';
import rcSliderTheme from 'rc-slider/assets/index.css'; // eslint-disable-line no-unused-vars

import Icon from '../Icon';
import theme from './Slider.scss';

/**
 * This function give the selected icon position if there is more than 1 icon
 * @param {array} icons - array of icons
 * @param {number} value - current value of the slider
 * @param {number} min - minimum value of the slider
 * @param {number} max - maximum value of the slider
 */
export function getSelectedIconPosition(icons, value, min, max) {
	if (icons && Array.isArray(icons) && icons.length > 1) {
		const interval = (max - min) / (icons.length - 1);
		return Math.round(value / interval);
	}
	return -1;
}

/**
 * This function allow to get the icons components
 * @param {array} icons - array of icons
 * @param {number} value - current value of the slider
 * @param {number} min - minimum value of the slider
 * @param {number} max - maximum value of the slider
 */
function getIcons(icons, value, min, max) {
	if (icons && Array.isArray(icons) && icons.length > 1) {
		const position = getSelectedIconPosition(icons, value, min, max);
		return icons.map((icon, index) => (
			<Icon name={icon} className={index === position ? theme.selected : null} key={index} />
		));
	}
	return null;
}

/**
 * This function return the label to show on top of the slider
 * @param {*} value - The current value of the slider
 * @param {*} label - The label to show aside of the value
 * @param {*} emptyValueLabel - The label to show if the value is empty
 */
function getTextLabel(value, label, emptyValueLabel) {
	if (!value && value !== 0) {
		return <span>{emptyValueLabel}</span>;
	}
	return (
		<span className={theme['informations-label']}>
			{label} {value} %
		</span>
	);
}

/**
 * The slider component
 * @param {object} props
 */
function Slider({ id, label, value, icons, emptyValueLabel, labelIcon, min, max, ...rest }) {
	return (
		<span className={theme['tc-slider-container']}>
			<div className={theme.informations}>
				{labelIcon && <Icon name={labelIcon} />}
				{getTextLabel(value, label, emptyValueLabel)}
			</div>
			<label htmlFor={id}>
				<RcSlider
					id={id}
					value={value}
					min={min}
					max={max}
					className={theme['tc-slider']}
					{...rest}
				/>
			</label>
			<div className={theme.icons}>{icons ? getIcons(icons, value, min, max) : null}</div>
		</span>
	);
}

Slider.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.number,
	onChange: PropTypes.func,
	onAfterChange: PropTypes.func,
	icons: PropTypes.array,
	labelIcon: PropTypes.string,
	emptyValueLabel: PropTypes.string,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
};

Slider.defaultProps = {
	min: 0,
	max: 100,
};

export default Slider;
