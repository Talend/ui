import { forwardRef, JSXElementConstructor, ReactElement, Ref } from 'react';

import classnames from 'classnames';
import range from 'lodash/range';
import RcSlider, { SliderRef } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { HandleProps } from 'rc-slider/lib/Handles/Handle';

// eslint-disable-line no-unused-vars
import { ButtonIcon } from '@talend/design-system';

import Icon from '../Icon';

import theme from './Slider.module.scss';

/**
 * Options for controlling slider operator display mode
 */
export const SliderModes = {
	GREATER_THAN: 'greaterThan',
	EQUALS: 'equals',
	EXCLUSIVE: 'exclusive',
};

/**
 * this function check if we have icons to display
 * @param {array} icons array if icons to display
 */
function isIconsAvailable(icons: string[]) {
	return icons && Array.isArray(icons) && icons.length > 1;
}

/**
 * This function give the selected icon position if there is more than 1 icon
 */
export function getSelectedIconPosition(
	icons: string[],
	min: number,
	max: number,
	value?: number | number[],
) {
	if (Array.isArray(value) || value === undefined) {
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
export function getCaptionsValue(captionsLength: number, min: number, max: number) {
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
export function renderActions(
	actions: SliderCaptionAction[],
	onChange: (value: number | number[]) => void,
	min: number,
	max: number,
	value?: number | number[],
	disabled?: boolean,
) {
	const captions = getCaptionsValue(actions.length, min, max);
	return (
		<div className={classnames(theme['tc-slider-captions'], 'tc-slider-captions')} key="actions">
			{actions.map((action, index) => (
				<ButtonIcon
					tooltipPlacement="bottom"
					{...action}
					key={index}
					onClick={() => onChange(captions[index])}
					disabled={disabled}
				>
					{'children' in action ? action.children || '' : 'label' in action ? action.label : ''}
				</ButtonIcon>
			))}
		</div>
	);
}

function renderIcons(icons: string[], min: number, max: number, value?: number | number[]) {
	if (isIconsAvailable(icons)) {
		const position = getSelectedIconPosition(icons, min, max, value);
		return (
			<div className={classnames(theme['tc-slider-captions'], 'tc-slider-captions')} key="icons">
				{icons.map((icon, index) => (
					<div
						className={classnames(
							theme['tc-slider-captions-element'],
							'tc-slider-captions-element',
						)}
						key={index}
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

function renderTextCaptions(
	captionTextStepNumber: number,
	captionsFormat: (value?: number) => string,
	min: number,
	max: number,
) {
	if (captionTextStepNumber > 1) {
		const captions = getCaptionsValue(captionTextStepNumber, min, max);
		return (
			<div className={classnames(theme['tc-slider-captions'], 'tc-slider-captions')} key="captions">
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

function getCaption(
	onChange: (value: number | number[]) => void,
	captionsFormat: (value?: number) => string,
	min: number,
	max: number,
	value?: number | number[],
	captionActions?: SliderCaptionAction[],
	captionIcons?: string[],
	captionTextStepNumber?: number,
	disabled?: boolean,
) {
	if (captionActions) {
		return renderActions(captionActions, onChange, min, max, value, disabled);
	}
	if (captionIcons) {
		return renderIcons(captionIcons, min, max, value);
	}
	if (captionTextStepNumber) {
		return renderTextCaptions(captionTextStepNumber, captionsFormat, min, max);
	}
	return null;
}

/**
 * Function to set the tooltip
 * @param {function} captionsFormat the function to format the caption
 */
function getHandle(captionsFormat: ((value?: number) => string) | undefined) {
	function renderHandler(
		origin: React.ReactElement<React.HTMLAttributes<HTMLDivElement>>,
		props: any,
	) {
		return (
			<div className={theme['tc-slider__handler']}>
				<div className={theme['tc-slider__value']} style={origin.props.style}>
					{captionsFormat ? captionsFormat(props?.value) : null}
				</div>
				{origin}
			</div>
		);
	}

	return renderHandler;
}

type SliderCaptionAction =
	| {
			id: string;
			label: string;
			icon: string;
			'data-feature'?: string;
			link: true;
			hideLabel: true;
	  }
	| {
			id: string;
			children?: string;
			'data-feature'?: string;
			icon: string;
	  };

type SliderProps = {
	id?: string;
	value?: number | number[];
	onChange: (value: number | number[]) => void;
	getTooltipContainer?: () => HTMLElement;
	onAfterChange?: (value: number | number[]) => void;
	captionActions?: SliderCaptionAction[];
	captionIcons?: string[];
	captionTextStepNumber?: number;
	min?: number;
	max?: number;
	step?: number;
	mode?: 'greaterThan' | 'equals' | 'exclusive';
	captionsFormat?: (value?: number) => string;
	disabled?: boolean;
	hideTooltip?: boolean;
	allowCross?: boolean;
};

const Slider = forwardRef(
	(
		{
			id,
			value,
			captionActions,
			captionIcons,
			captionTextStepNumber,
			captionsFormat = (captionValue: any) => captionValue,
			min = 0,
			max = 100,
			step = 1,
			mode,
			onChange,
			disabled,
			hideTooltip,
			...rest
		}: SliderProps,
		ref: Ref<SliderRef> | undefined,
	) => {
		const handleRender = getHandle(captionsFormat);

		const noValue = value === null || value === undefined;
		return (
			<div>
				<div className={classnames(theme['tc-slider'], 'tc-slider')}>
					<RcSlider
						range={Array.isArray(value)}
						defaultValue={noValue ? undefined : 0}
						value={value}
						min={min}
						max={max}
						step={step}
						handleRender={noValue || hideTooltip ? undefined : handleRender}
						className={classnames(
							theme['tc-slider-rc-slider'],
							{ [theme['tc-slider-rc-slider--track-equals']]: mode === SliderModes.EQUALS },
							{ [theme['tc-slider-rc-slider--track-exclusive']]: mode === SliderModes.EXCLUSIVE },
							{
								[theme['tc-slider-rc-slider--track-greater-than']]:
									mode === SliderModes.GREATER_THAN,
							},
							'tc-slider-rc-slider',
							{ 'tc-slider-rc-slider--track-equals': mode === SliderModes.EQUALS },
							{ 'tc-slider-rc-slider--track-exclusive': mode === SliderModes.EXCLUSIVE },
							{ 'tc-slider-rc-slider--track-greater-than': mode === SliderModes.GREATER_THAN },
						)}
						onChange={onChange}
						disabled={disabled}
						ref={ref}
						{...rest}
					/>
				</div>
				{getCaption(
					onChange,
					captionsFormat,
					min,
					max,
					value,
					captionActions,
					captionIcons,
					captionTextStepNumber,
					disabled,
				)}
			</div>
		);
	},
);

Slider.displayName = 'Slider';

// @ts-ignore
Slider.MODES = SliderModes;
export default Slider;
