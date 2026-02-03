import { useState } from 'react';

import { Enumeration } from '../../../components/Enumeration';

export default {
	component: Enumeration,
	title: 'Form/Enumeration',
};

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
export const Default = () => {
	const [items, setItems] = useState([...getItems(100, 500)]);

	return (
		<Enumeration
			id={'default'}
			items={items}
			loadMoreRows={({ stopIndex }) =>
				new Promise<void>(resolve => {
					setItems([...getItems(stopIndex, 500)]);
					resolve();
				})
			}
			onChange={setItems}
			onImport={(data: string[]) => {
				setItems([...data, ...items]);
			}}
			title="This is a title"
		/>
	);
};
Default.parameters = {
	chromatic: { disableSnapshot: true },
};

export const Empty = () => {
	const [items, setItems] = useState<string[]>([]);

	return <Enumeration title="This is a title" items={items} id={'empty'} onChange={setItems} />;
};
