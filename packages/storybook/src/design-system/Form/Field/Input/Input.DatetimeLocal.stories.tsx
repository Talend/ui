import { Form, StackVertical } from '@talend/design-system';

export default {
	component: Form.DatetimeLocal,
};

export const DatetimeLocal = () => (
	<StackVertical gap="M" justify="stretch" align="stretch">
		<Form.DatetimeLocal
			placeholder="Placeholder"
			name="datetimelocal"
			label="DatetimeLocal"
			min="2018-06-07T00:00"
			max="2018-06-14T00:00"
		/>
		<Form.DatetimeLocal
			placeholder="Placeholder"
			name="datetimelocal"
			label="DatetimeLocal disabled"
			disabled
		/>
		<Form.DatetimeLocal
			placeholder="Placeholder"
			name="datetimelocal"
			label="DatetimeLocal read-only"
			min="2018-06-07T00:00"
			max="2018-06-14T00:00"
			readOnly
		/>
		<Form.DatetimeLocal
			name="datetimelocal"
			label="DatetimeLocal filled"
			min="2018-06-07T00:00"
			max="2018-06-14T00:00"
			defaultValue="2018-06-13T18:25"
		/>
		<Form.DatetimeLocal
			name="datetimelocal"
			label="DatetimeLocal filled disabled"
			defaultValue="2018-06-13T18:25"
			disabled
		/>
		<Form.DatetimeLocal
			name="datetimelocal"
			label="DatetimeLocal filled read-only"
			min="2018-06-07T00:00"
			max="2018-06-14T00:00"
			defaultValue="2018-06-13T18:25"
			readOnly
		/>
	</StackVertical>
);
