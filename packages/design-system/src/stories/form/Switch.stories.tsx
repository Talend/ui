import { MouseEvent, useState } from 'react';
import { Switch } from '../../';

export default {
	title: 'Form/Switch',
	component: Switch,
};

export const Default = (props: any) => <Switch {...props} />;
Default.args = {
	values: ['input', 'both', 'output'],
};

export const Uncontrolled = () => {
	const defaultValue = 'value f';
	const [value, setValue] = useState(defaultValue);
	return (
		<>
			<p>Selected value: {value}</p>
			<Switch
				values={['value a', 'value b', 'value c', 'value d', 'value e', 'value f']}
				defaultValue={defaultValue}
				onChange={(_: MouseEvent<HTMLButtonElement>, v: string) => setValue(v)}
			/>
		</>
	);
};
