import React from 'react';
import Content from '../Content.component';
import DatetimeConfiguration from './DatetimeColumn.configuration';

function DatetimeColumn(props) {
	return <Content {...props} />;
}

DatetimeColumn.defaultProps = {
	...Content.defaultProps,
	...DatetimeConfiguration,
};

export default DatetimeColumn;
