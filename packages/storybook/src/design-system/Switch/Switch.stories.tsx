import { useState } from 'react';

import { Switch } from '@talend/design-system';

export default { component: Switch };

export const Default = () => <Switch values={['input', 'both', 'output']} />;

export const UnControlled = () => {
	const defaultValue = 'value f';
	const [value, setValue] = useState(defaultValue);
	return (
		<>
			<p>Selected value: {value}</p>
			<Switch
				values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']}
				defaultValue={defaultValue}
				onChange={v => setValue(v)}
			/>
		</>
	);
};

export const WithNoValues = () => <Switch />;
