import React from 'react';
import Form from '../../index';
import { StackVertical } from '../../../Stack';

export default {
	component: Form.Time,
};

export const Time = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Time placeholder="Placeholder" name="time" label="Time" />
		<Form.Time placeholder="Placeholder" name="time" label="Time disabled" disabled />
		<Form.Time placeholder="Placeholder" name="time" label="Time read-only" readOnly />
		<Form.Time name="time" label="Time filled" defaultValue="09:00" min="09:00" max="18:00" />
		<Form.Time
			name="time"
			label="Time filled disabled"
			defaultValue="09:00"
			min="09:00"
			max="18:00"
			disabled
		/>
		<Form.Time
			name="time"
			label="Time filled read-only"
			defaultValue="09:00"
			min="09:00"
			max="18:00"
			readOnly
		/>
	</StackVertical>
);
