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

const getItems = (numItems: number, totalItems: number) => {
	const itemsToAdd = [];

	for (let i = 0; i < totalItems; i++) {
		if (i <= numItems) {
			itemsToAdd.push(`Item ${i + 1}`);
		} else {
			itemsToAdd.push('');
		}
	}

	return itemsToAdd;
};
export const EnumeraionDefault = () => {
	const [items, setItems] = useState([...getItems(100, 500)]);

	return (
		<Enumeration
			id={'default'}
			items={items}
			loadMoreRows={({ stopIndex }: { startIndex: number; stopIndex: number }) => {
				setItems([...getItems(stopIndex, 500)]);
			}}
			onChange={setItems}
			onImport={(data: string[]) => {
				setItems([...data, ...items]);
			}}
			onRemove={(ids: string[]) => setItems(items.filter(item => !ids.includes(item)))}
			title="This is a title"
		/>
	);
};

export const Empty = () => <Enumeration title="This is a title" items={[]} id={'empty'} />;
