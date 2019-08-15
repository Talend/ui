import React from 'react';
import { FIELD_HOURS, FIELD_MINUTES } from '../../DateTime/constants';
import { strToTime } from '../../DateTime/date-extraction';

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
		return (<ul>
			{options.map((time, index) => (
				<li key={index} onClick={event => this.onSelect(event, time, index)}>{time}</li>
			))}
		</ul>);
	}
}

export default TimePicker;