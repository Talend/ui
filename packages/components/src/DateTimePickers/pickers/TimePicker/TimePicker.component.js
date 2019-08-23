import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { timeToStr } from '../../DateTime/date-extraction';
import withListGesture from '../../../Gesture/withListGesture';

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

export class TimePicker extends React.Component {
	static propTypes = {
		interval: PropTypes.number,
		onSubmit: PropTypes.func.isRequired,
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
			hightlightedItemIndex:
				this.options.findIndex(option => option.includes(props.textInput)),
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
	onSelect(event, time) {
		this.props.onSubmit(event, {
			time,
		});
	}
	scrollItemIntoView(textInput) {
		const found = this.options.findIndex(option => option.includes(textInput));
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
					const className = classNames(
						{ highlight: index === this.state.hightlightedItemIndex });
					const ariaProps = {};
					if (index === this.state.hightlightedItemIndex) {
						ariaProps['aria-current'] = 'time';
					}
					return (
						<button
							role="listitem"
							type="button"
							key={index}
							className={className}
							onClick={event => this.onSelect(event, time)}
							onKeyDown={event => this.props.onKeyDown(event, this.containerRef.childNodes[index])}
							{...ariaProps}
						>
							{time}
						</button>
					);
				})}
			</div>
		);
	}
}

export default withListGesture(TimePicker);
