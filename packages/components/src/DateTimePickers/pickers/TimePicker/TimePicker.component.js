import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { timeToStr, pad } from '../../Time/time-extraction';
import withListGesture from '../../../Gesture/withListGesture';

import theme from './TimePicker.scss';

function isBefore(a, b) {
	if (a.hours > b.hours) {
		return false;
	} else if (a.hours === b.hours && a.minutes > b.minutes) {
		return false;
	} else if (a.hours === b.hours && a.minutes === b.minutes && a.seconds >= b.seconds) {
		return false;
	}
	return true;
}

function addInterval({ hours, minutes, ...seconds }, interval = 60) {
	let newMinutes = minutes + interval;
	let newHours = hours;
	if (Math.floor(newMinutes / 60) > 0) {
		newHours += Math.floor(newMinutes / 60);
		newMinutes %= 60;
	}
	return {
		hours: newHours,
		minutes: newMinutes,
		...seconds,
	};
}

function getOptions(interval = 60, useSeconds) {
	const options = [];
	const start = { hours: 0, minutes: 0, seconds: 0 };
	const end = { hours: 23, minutes: 59, seconds: 59 };
	let current = start;
	while (isBefore(current, end)) {
		options.push({ label: timeToStr(current, useSeconds), value: current });
		current = addInterval(current, interval);
	}

	return options;
}

export class TimePicker extends React.Component {
	static propTypes = {
		interval: PropTypes.number,
		onChange: PropTypes.func.isRequired,
		onKeyDown: PropTypes.func.isRequired,
		textInput: PropTypes.string,
		useSeconds: PropTypes.bool,
	};

	static defaultProps = {
		interval: 60,
		useSeconds: false,
	};

	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.updateHighlightIndex = this.updateHighlightIndex.bind(this);
		this.scrollItemIntoView = this.scrollItemIntoView.bind(this);
		this.options = getOptions(props.interval, props.useSeconds);
		this.state = {
			hightlightedItemIndex: this.options.findIndex(option =>
				option.label.includes(props.textInput),
			),
		};
	}
	componentDidMount() {
		if (this.props.textInput) {
			this.scrollItemIntoView(this.props.textInput);
		}
	}
	componentDidUpdate(prevProps) {
		if (prevProps.textInput !== this.props.textInput) {
			this.scrollItemIntoView(this.props.textInput);
		}
	}
	onSelect(event, option) {
		this.props.onChange(event, {
			textInput: option.label,
			time: {
				hours: pad(option.value.hours),
				minutes: pad(option.value.minutes),
				seconds: pad(option.value.seconds),
			},
		});
	}
	scrollItemIntoView(textInput) {
		const found = this.options.findIndex(option => option.label.includes(textInput));
		if (found) {
			const ref = this.containerRef.childNodes[found];
			if (ref) {
				ref.scrollIntoView({
					block: 'center',
				});
			}
			if (found !== this.state.hightlightedItemIndex) {
				this.updateHighlightIndex(found);
			}
		}
	}
	updateHighlightIndex(index) {
		this.setState(({ hightlightedItemIndex }) => {
			if (hightlightedItemIndex !== index) {
				return {
					hightlightedItemIndex: index,
				};
			}
			return null;
		});
	}
	render() {
		return (
			<div className={theme.container} ref={ref => (this.containerRef = ref)} role="list">
				{this.options.map((option, index) => {
					const className = classNames('tc-time-picker-time', {
						highlight: index === this.state.hightlightedItemIndex,
					});
					const ariaProps = {};
					if (index === this.state.hightlightedItemIndex) {
						ariaProps['aria-current'] = 'time';
					}
					return (
						<button
							tabIndex={-1}
							role="listitem"
							type="button"
							key={index}
							className={className}
							onClick={event => this.onSelect(event, option)}
							onKeyDown={event => this.props.onKeyDown(event, this.containerRef.childNodes[index])}
							{...ariaProps}
						>
							{option.label}
						</button>
					);
				})}
			</div>
		);
	}
}

export default withListGesture(TimePicker, true);
