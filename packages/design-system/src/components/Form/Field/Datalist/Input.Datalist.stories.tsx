import React from 'react';
import Form from '../../index';
import { StackVertical } from '../../../Stack';

export default {
	component: Form.Datalist,
};

export const Datalist = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.Datalist
			placeholder="Placeholder"
			name="datalist"
			label="Datalist"
			values={['', 'foo', 'bar']}
		/>
		<Form.Datalist
			placeholder="Placeholder"
			name="datalist"
			label="Datalist disabled"
			values={['', 'foo', 'bar']}
			disabled
		/>
		<Form.Datalist
			placeholder="Placeholder"
			name="datalist"
			label="Datalist read-only"
			values={['', 'foo', 'bar']}
			readOnly
		/>
		<Form.Datalist
			name="datalist"
			label="Datalist filled"
			defaultValue="foo"
			values={['', 'foo', 'bar']}
		/>
		<Form.Datalist
			name="datalist"
			label="Datalist filled disabled"
			defaultValue="foo"
			values={['', 'foo', 'bar']}
			disabled
		/>
		<Form.Datalist
			name="datalist"
			label="Datalist filled read-only"
			defaultValue="foo"
			values={['', 'foo', 'bar']}
			readOnly
		/>
	</StackVertical>
);
