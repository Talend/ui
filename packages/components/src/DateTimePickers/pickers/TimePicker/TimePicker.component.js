import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { strToTime, timeToStr } from '../../DateTime/date-extraction';

import theme from './TimePicker.scss';

export function isBefore(a, b) {
	if (a.hours > b.hours) {
		return false;
	} else if (a.hours === b.hours && a.minutes > b.minutes) {
		return false;
	} else if (a.hours === b.hours && a.minutes === b.minutes && a.seconds >= b.seconds) {
		return false;
	}
	return true;
}

export function addInterval({ hours, minutes, ...seconds }, interval = 60) {
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

export function getOptions(interval = 60, useSeconds = false) {
	const options = [];
	const start = { hours: 0, minutes: 0, seconds: 0 };
	const end = { hours: 23, minutes: 59, seconds: 59 };
	let current = start;
	while (isBefore(current, end)) {
		options.push(timeToStr(current, useSeconds));
		current = addInterval(current, interval);
	}

	return options;
}

class TimePicker extends React.Component {
	static propTypes = {
		interval: PropTypes.number,
		textInput: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
		useSeconds: PropTypes.bool,
	};

	static defaultProps = {
		interval: 60,
		useSeconds: false,
	};

	constructor(props) {
		super(props);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.updateHighlightIndex = this.updateHighlightIndex.bind(this);
		this.options = getOptions(props.interval, props.useSeconds);
		this.state = {
			hightlightedItemIndex:
				this.options.findIndex(option => option.includes(props.textInput)),
		};
	}
	componentDidUpdate(prevProps) {
		if (prevProps.textInput !== this.props.textInput) {
			const found = this.options.findIndex(option => option.includes(this.props.textInput));
			if (found) {
				const ref = this.containerRef.childNodes[found];
				if (ref) {
					ref.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
				if (found !== this.state.hightlightedItemIndex) {
					this.updateHighlightIndex(found);
				}
			}
		}
	}
	onMouseOver(event, index) {
		this.updateHighlightIndex(index);
	}
	onSelect(event, time) {
		event.stopPropagation();
		this.props.onSubmit(event, {
			time: strToTime(time, this.props.useSeconds),
		});
	}
	updateHighlightIndex(index) {
		this.setState(({ hightlightedItemIndex }) => {
			if (hightlightedItemIndex !== index) {
				return {
					hightlightedItemIndex: index,
				};
			}
			return {};
		});
	}
	render() {
		return (
			<div
				className={theme.container}
				ref={ref => (this.containerRef = ref)}
				role="list"
			>
				{this.options.map((time, index) => {
					const className = classNames(theme.time,
						{ highlight: index === this.state.hightlightedItemIndex });
					return (
						<button
							type="button"
							key={index}
							className={className}
							onMouseOver={event => this.onMouseOver(event, index)}
							onClick={event => this.onSelect(event, time)}
							role="listitem"
						>
							{time}
						</button>
					);
				})}
			</div>
		);
	}
}

export default TimePicker;
