/* eslint-disable no-console */
import Breadcrumbs from './Breadcrumbs.component';

const meta = {
	title: 'Components/Navigation/Breadcrumbs',
	component: Breadcrumbs,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => {
		const items = [
			{ text: 'Text A', title: 'Text title A', onClick: () => console.log('Text A clicked') },
			{ text: 'Text B', title: 'Text title B', onClick: () => console.log('Text B clicked') },
			{
				text: 'text c in lower case',
				title: 'Text title C',
				onClick: () => console.log('Text C clicked'),
			},
		];
		return <Breadcrumbs items={items} />;
	},
};

export const Loading = {
	render: () => <Breadcrumbs loading />,
};

export const WithMaxItemsReached = {
	render: () => {
		const items = [
			{
				text: 'item very very very very long that we have to display',
				title: 'item very very very very long that we have to display',
				onClick: () => console.log('item very very very very long that we have to display clicked'),
			},
			{ text: 'Text B', title: 'Text title B', onClick: () => console.log('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: () => console.log('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: () => console.log('Text D clicked') },
		];
		return <Breadcrumbs items={items} />;
	},
};

export const WithMoreThanDefaultMaxItemsValue = {
	render: () => {
		const items = [
			{
				text: 'item very very very very long that we have to display',
				title: 'item very very very very long that we have to display',
				onClick: () => console.log('item very very very very long that we have to display clicked'),
			},
			{ text: 'Text B', title: 'Text title B', onClick: () => console.log('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: () => console.log('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: () => console.log('Text D clicked') },
			{ text: 'Text E', title: 'Text title E', onClick: () => console.log('Text E clicked') },
		];
		return <Breadcrumbs items={items} />;
	},
};

export const WithMoreThanASpecifiedMaxItemsValue = {
	render: () => {
		const items = [
			{
				text: 'item very very very very long that we have to display',
				title: 'item very very very very long that we have to display',
				onClick: () => console.log('item very very very very long that we have to display clicked'),
			},
			{ text: 'Text B', title: 'Text title B', onClick: () => console.log('Text B clicked') },
			{ text: 'Text C', title: 'Text title C', onClick: () => console.log('Text C clicked') },
			{ text: 'Text D', title: 'Text title D', onClick: () => console.log('Text D clicked') },
			{ text: 'Text E', title: 'Text title E', onClick: () => console.log('Text E clicked') },
			{ text: 'Text F', title: 'Text title F', onClick: () => console.log('Text F clicked') },
		];
		return <Breadcrumbs items={items} maxItems={5} />;
	},
};
