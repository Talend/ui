import { Story } from '@storybook/react';
import { useState } from 'react';
import { Switch } from '../../';

export default { component: Switch };

export const Default = (props: Story<typeof Switch>) => (
	<Switch values={['input', 'both', 'output']} />
);

export const UnControlled = (props: Story<typeof Switch>) => {
	const defaultValue = 'value f';
	const [value, setValue] = useState(defaultValue);
	return (
		<>
			<p>Selected value: {value}</p>
			<Switch
				values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']}
				defaultValue={defaultValue}
				onChange={(e, v) => setValue(v)}
			/>
		</>
	);
};
