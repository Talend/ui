import { useState } from 'react';

import { Enumeration as EnumerationComponent } from '../../../components/Enumeration';

export default {
	component: EnumerationComponent,
	title: 'Form/Enumeration',
};

const Enumeration = (args: any) => (
	<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
		<EnumerationComponent {...args} />
	</div>
);

export const Default = () => {
	const [items, setItems] = useState([
		'Item 1',
		'Item 2',
		'Item 3',
		'Item 4',
		'Item 5',
		'Item 6',
		'Item 7',
		'Item 8',
		'Item 9',
		'Item 10',
		'Item 11',
		'Item 12',
	]);

	return (
		<Enumeration
			id={'default'}
			items={items}
			loadMoreRows={() => new Promise(resolve => resolve([]))}
			onChange={setItems}
			onImport={(data: string) => {
				console.log(data);
				setItems([...data.split('\n').filter(Boolean), ...items]);
			}}
			onRemove={(ids: string[]) => setItems(items.filter(item => !ids.includes(item)))}
			title="This is a title"
		/>
	);
};

export const Empty = () => <Enumeration title="This is a title" items={[]} id={'empty'} />;
