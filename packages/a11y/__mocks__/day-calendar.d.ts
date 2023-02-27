export default DayCalendar;
declare class DayCalendar extends React.Component<any, any, any> {
	constructor(props: any);
	constructor(props: any, context: any);
	isCurrentMonth(date: any): boolean;
	render(): JSX.Element;
	calendarRef: HTMLTableElement | null | undefined;
}
declare namespace DayCalendar {
	const displayName: string;
	namespace propTypes {
		const onKeyDown: PropTypes.Validator<(...args: any[]) => any>;
		const month: PropTypes.Validator<number>;
		const year: PropTypes.Validator<number>;
	}
}
import React from 'react';
import PropTypes from 'prop-types';
