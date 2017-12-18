import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import RcSlider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import rcSliderTheme from 'rc-slider/assets/index.css'; // eslint-disable-line no-unused-vars
import range from 'lodash/range';
import Icon from '../Icon';
import theme from './Slider.scss';

const noFormat = value => value;

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
		return (
			<div className={theme.icons}>
				{icons.map((icon, index) => (
					<Icon name={icon} className={index === position ? theme.selected : null} key={index} />
				))}
			</div>
		);
	}
	return null;
}

/**
 * This function allow to get the text caption
 * @param {number} captionTextStepNumber the number of text captions
 * @param {function} captionsFormat the function to format the caption
 * @param {number} value current value of the slider
 * @param {number} min min value of the slider
 * @param {number} max max value of the slider
 */
function getTextCaptions(captionTextStepNumber, captionsFormat, value, min, max) {
	if (captionTextStepNumber > 1) {
		const interval = (max - min) / (captionTextStepNumber - 1);
		const captions = range(min, max, interval);
		captions.push(max);
		return (
			<div className={theme['text-caption']}>
				{captions.map((caption, index) => (
					<span key={index} className={theme.caption}>
						{captionsFormat(caption)}
					</span>
				))}
			</div>
		);
	}
	return null;
}

/**
 * function that return icons or text captions
 * @param {array} captionIcons icons to display on the bottom of the slider
 * @param {number} captionTextStepNumber number of text caption
 * @param {function} captionsFormat the function to format the caption
 * @param {number} value current value of the slider
 * @param {number} min min value of the slider
 * @param {number} max max value of the slider
 */
function getCaption(captionIcons, captionTextStepNumber, captionsFormat, value, min, max) {
	if (captionIcons) {
		return getIcons(captionIcons, value, min, max);
	} else if (captionTextStepNumber) {
		return getTextCaptions(captionTextStepNumber, captionsFormat, value, min, max);
	}
	return null;
}

/**
 * Function to set the tooltip
 * @param {function} captionsFormat the function to format the caption
 */
function getHandle(captionsFormat) {
	function handle(props) {
		return (
			<Tooltip
				prefixCls="rc-slider-tooltip"
				overlay={captionsFormat(props.value)}
				visible
				placement="top"
				key={props.index}
			>
				<RcSlider.Handle {...props} />
			</Tooltip>
		);
	}

	handle.propTypes = {
		value: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
	};

	return handle;
}

// eslint-disable-next-line react/prefer-stateless-function
class Slider extends React.Component {
	static propTypes = {
		id: PropTypes.string,
		value: PropTypes.number,
		onChange: PropTypes.func,
		onAfterChange: PropTypes.func,
		captionIcons: PropTypes.array,
		captionTextStepNumber: PropTypes.number,
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		captionsFormat: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			handle: getHandle(props.captionsFormat),
		};
	}

	render() {
		const {
			id,
			value,
			captionIcons,
			captionTextStepNumber,
			captionsFormat,
			min,
			max,
			...rest
		} = this.props;
		return (
			<span className={classnames(theme['tc-slider-container'])}>
				<RcSlider
					id={id}
					value={value}
					min={min}
					max={max}
					handle={this.state.handle}
					className={theme['tc-slider']}
					{...rest}
				/>
				{getCaption(captionIcons, captionTextStepNumber, captionsFormat, value, min, max)}
			</span>
		);
	}
}

Slider.defaultProps = {
	min: 0,
	max: 100,
	captionsFormat: noFormat,
};

export default Slider;
