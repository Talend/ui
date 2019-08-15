import React from 'react';
import { FIELD_HOURS } from '../../DateTime/constants';
import { strToTime } from '../../DateTime/date-extraction';

import theme from './TimePicker.scss';

const options = [
	'00:00',
	'01:00',
	'02:00',
	'03:00',
	'04:00',
	'05:00',
	'06:00',
	'07:00',
	'08:00',
	'09:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
	'21:00',
	'22:00',
	'23:00',
];

class TimePicker extends React.Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			selectdTime: props.selection.time,
		};
	}
	componentDidUpdate(prevProps) {
		if (prevProps.filter !== this.props.textInput) {
			const found = options.findIndex(option => option.includes(this.props.textInput));
			if (found) {
				const ref = this.containerRef.childNodes[found];
				if (ref) {
					ref.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
				}
			}
		}
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
			field: FIELD_HOURS,
		});
	}
	render() {
		return (<div className={theme.container} ref={ref => (this.containerRef = ref)}>
			{options.map((time, index) => (
				<button
					type="button"
					key={index}
					className={theme.time}
					onClick={event => this.onSelect(event, time, index)}
				>
					{time}
				</button>
			))}
		</div>);
	}
}

export default TimePicker;
