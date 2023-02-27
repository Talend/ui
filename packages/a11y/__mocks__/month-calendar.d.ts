export default MonthCalendar;
declare class MonthCalendar extends React.Component<any, any, any> {
	constructor(props: any);
	constructor(props: any, context: any);
	render(): JSX.Element;
	calendarRef: HTMLTableElement | null | undefined;
}
declare namespace MonthCalendar {
	const displayName: string;
	namespace propTypes {
		const onKeyDown: PropTypes.Validator<(...args: any[]) => any>;
	}
}
import React from 'react';
import PropTypes from 'prop-types';
