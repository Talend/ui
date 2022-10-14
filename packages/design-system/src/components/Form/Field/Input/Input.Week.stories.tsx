import React from 'react';
import Form from '../../index';
import { StackVertical } from '../../../Stack';

export default {
	component: Form.Week,
};

export const Week = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Week placeholder="Placeholder" name="time" label="Week" min="2018-W18" max="2018-W26" />
		<Form.Week
			placeholder="Placeholder"
			name="time"
			label="Week disabled"
			disabled
			min="2018-W18"
			max="2018-W26"
		/>
		<Form.Week
			placeholder="Placeholder"
			name="time"
			label="Week read-only"
			readOnly
			min="2018-W18"
			max="2018-W26"
		/>
		<Form.Week
			name="time"
			label="Week filled"
			defaultValue="2018-W20"
			min="2018-W18"
			max="2018-W26"
		/>
		<Form.Week
			name="time"
			label="Week filled disabled"
			defaultValue="2018-W20"
			disabled
			min="2018-W18"
			max="2018-W26"
		/>
		<Form.Week
			name="time"
			label="Week filled read-only"
			defaultValue="2018-W20"
			readOnly
			min="2018-W18"
			max="2018-W26"
		/>
	</StackVertical>
);
