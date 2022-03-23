import React from 'react';
import get from 'lodash/get';

export default {
	CustomCellRenderer: props => (
		<span>{get(props, 'value.value.bytes', '') || get(props, 'value.value', '')}</span>
	),
	CustomHeaderRenderer: props => <span>{props.displayName}</span>,
	CustomPinHeaderRenderer: () => <span />,
	CustomStringCellRenderer: props => (
		<span>
			I'm a string(
			{props.data.value})
		</span>
	),
	CustomIntCellRenderer: props => (
		<span>
			I'm an int(
			{props.data.value})
		</span>
	),
	CustomBooleanCellRenderer: props => (
		<span>
			I'm a boolean(
			{props.data.value})
		</span>
	),
	CustomDateCellRenderer: props => (
		<span>
			I'm a date(
			{props.data.value})
		</span>
	),
};
