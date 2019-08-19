import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FIELD_HOURS } from '../../DateTime/constants';
import { strToTime, timeToStr } from '../../DateTime/date-extraction';

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

function addInterval({ hours, minutes, seconds }, interval) {
	let newMinutes = minutes + interval;
	let newHours = hours;
	if (Math.floor(newMinutes / 60) > 0) {
		newHours += Math.floor(newMinutes / 60);
		newMinutes %= 60;
	}
	return {
		hours: newHours,
		minutes: newMinutes,
		seconds,
	};
}


function getOptions(interval = 60) {
	const options = [];
	const start = { hours: 0, minutes: 0, seconds: 0 };
	const end = { hours: 23, minutes: 59, seconds: 59 };
	let current = start;
	while (isBefore(current, end)) {
		options.push(timeToStr(current));
		current = addInterval(current, interval);
	}

	return options;
}


class TimePicker extends React.Component {
	static propTypes = {
		selection: PropTypes.shape({
			time: PropTypes.string,
		}),
		interval: PropTypes.number,
		textInput: PropTypes.string,
		onSubmit: PropTypes.func.isRequired,
	};

	static defaultProps = {
		interval: 60,
	};

	constructor(props) {
		super(props);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			selectdTime: props.selection.time,
		};
		this.options = getOptions(props.interval);
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
		this.setState({
			selectdTime: time,
		}, () => {
			this.submit(time);
		});
	}
	submit(time) {
		this.props.onSubmit(event, {
			time: strToTime(time),
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
		return (<div className={theme.container} ref={ref => (this.containerRef = ref)}>
			{this.options.map((time, index) => {
				const className = classNames(theme.time,
					{ highlight: index === this.state.hightlightedItemIndex });
				return (
					<button
						type="button"
						key={index}
						className={className}
						onMouseOver={event => this.onMouseOver(event, index)}
						onClick={event => this.onSelect(event, time, index)}
					>
						{time}
					</button>
				);
			})}
		</div>);
	}
}

export default TimePicker;
