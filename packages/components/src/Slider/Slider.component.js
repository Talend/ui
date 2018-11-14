import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import RcSlider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import rcSliderTheme from 'rc-slider/assets/index.css'; // eslint-disable-line no-unused-vars
import range from 'lodash/range';
import Icon from '../Icon';
import theme from './Slider.scss';
import Action from '../Actions/Action';

const noFormat = value => value;

/**
 * this function check if we have icons to display
 * @param {array} icons array if icons to display
 */
function isIconsAvailables(icons) {
	return icons && Array.isArray(icons) && icons.length > 1;
}

/**
 * This function give the selected icon position if there is more than 1 icon
 * @param {array} icons - array of icons
 * @param {number} value - current value of the slider
 * @param {number} min - minimum value of the slider
 * @param {number} max - maximum value of the slider
 */
export function getSelectedIconPosition(icons, value, min, max) {
	if (value == null) {
		return -1;
	}
	const interval = (max - min) / (icons.length - 1);
	return Math.round(value / interval);
}

/**
 * Return an array with ranged values calculate on the length of the captions .
 * @param {number} captionsLength
 * @param {number} min
 * @param {number} max
 */
export function getCaptionsValue(captionsLength, min, max) {
	const interval = (max - min) / (captionsLength - 1);
	const captionsValue = range(min, max, interval);
	captionsValue.push(max);
	return captionsValue;
}

/**
 * This function allow to get the actions components
 * @param {array} actions
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {function} onChange
 */
export function renderActions(actions, value, min, max, onChange, disabled) {
	const captions = getCaptionsValue(actions.length, min, max);
	const position = getSelectedIconPosition(actions, value, min, max);
	return (
		<div className={classnames(theme['tc-slider-captions'], 'tc-slider-captions')}>
			{actions.map((action, index) => (
				<Action
					{...action}
					disabled={disabled}
					key={index}
					onClick={() => onChange(captions[index])}
					className={classnames(
						theme['tc-slider-captions-element'],
						'tc-slider-captions-element',
						{ [theme.selected]: index === position },
						{ selected: index === position },
					)}
				/>
			))}
		</div>
	);
}

/**
 * This function allow to get the icons components
 * @param {array} icons - array of icons
 * @param {number} value - current value of the slider
 * @param {number} min - minimum value of the slider
 * @param {number} max - maximum value of the slider
 */
function renderIcons(icons, value, min, max) {
	if (isIconsAvailables(icons)) {
		const position = getSelectedIconPosition(icons, value, min, max);
		return (
			<div className={classnames(theme['tc-slider-captions'], 'tc-slider-captions')}>
				{icons.map((icon, index) => (
					<div
						className={classnames(
							theme['tc-slider-captions-element'],
							'tc-slider-captions-element',
						)}
					>
						<Icon
							name={icon}
							className={classnames(
								{ [theme.selected]: index === position },
								{ selected: index === position },
							)}
							key={index}
						/>
					</div>
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
 * @param {number} min min value of the slider
 * @param {number} max max value of the slider
 */
function renderTextCaptions(captionTextStepNumber, captionsFormat, min, max) {
	if (captionTextStepNumber > 1) {
		const captions = getCaptionsValue(captionTextStepNumber, min, max);
		return (
			<div className={classnames(theme['tc-slider-captions'], 'tc-slider-captions')}>
				{captions.map((caption, index) => (
					<div
						className={classnames(
							theme['tc-slider-captions-element'],
							'tc-slider-captions-element',
						)}
						key={index}
					>
						{captionsFormat(caption)}
					</div>
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
function getCaption(
	captionActions,
	captionIcons,
	captionTextStepNumber,
	captionsFormat,
	value,
	min,
	max,
	onChange,
	disabled,
) {
	if (captionActions) {
		return renderActions(captionActions, value, min, max, onChange, disabled);
	} else if (captionIcons) {
		return renderIcons(captionIcons, value, min, max);
	} else if (captionTextStepNumber) {
		return renderTextCaptions(captionTextStepNumber, captionsFormat, min, max);
	}
	return null;
}

/**
 * Function to set the tooltip
 * @param {function} captionsFormat the function to format the caption
 */
function getHandle(captionsFormat) {
	function Handle(props) {
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

	Handle.propTypes = {
		value: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
	};

	return Handle;
}

// eslint-disable-next-line react/prefer-stateless-function
class Slider extends React.Component {
	static displayName = 'Slider';

	static propTypes = {
		id: PropTypes.string,
		value: PropTypes.number,
		onChange: PropTypes.func.isRequired,
		onAfterChange: PropTypes.func,
		captionActions: PropTypes.array,
		captionIcons: PropTypes.array,
		captionTextStepNumber: PropTypes.number,
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		captionsFormat: PropTypes.func,
		disabled: PropTypes.bool,
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
			captionActions,
			captionIcons,
			captionTextStepNumber,
			captionsFormat,
			min,
			max,
			onChange,
			disabled,
			...rest
		} = this.props;
		const noValue = value === null || value === undefined;
		return (
			<div>
				<div className={classnames(theme['tc-slider'], 'tc-slider')}>
					<RcSlider
						id={id}
						value={value}
						min={min}
						max={max}
						handle={noValue ? undefined : this.state.handle}
						className={classnames(theme['tc-slider-rc-slider'], 'tc-slider-rc-slider')}
						onChange={onChange}
						disabled={disabled}
						{...rest}
					/>
				</div>
				{getCaption(
					captionActions,
					captionIcons,
					captionTextStepNumber,
					captionsFormat,
					value,
					min,
					max,
					onChange,
					disabled,
				)}
			</div>
		);
	}
}

Slider.defaultProps = {
	min: 0,
	max: 100,
	captionsFormat: noFormat,
};

export default Slider;
