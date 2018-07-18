import React from 'react';
import Form from '../src/index';
import { Layout, Drawer, HeaderBar } from '@talend/react-components';

function LayoutDrawer({ title, stacked, ...props}) {
	const drawers = [
		<Drawer.Container stacked={stacked}>
			<Form {...props} />
		</Drawer.Container>,
	];
	return (
		<Layout drawers={drawers} mode="TwoColumns" header={<HeaderBar />}>
			<div style={{ margin: 10 }}>
				<h1>{title}</h1>
				<p>To use a Form in a drawer you just have to create your component this way:</p>
				<code>
					{'<Drawer.Container><Form {...props} /></Drawer.Container>'}
				</code>
			</div>
		</Layout>
	);
}

const stories = [
	{
		name: 'Skeleton',
		story: () => <Form loading />,
	},
	{
		name: 'Skeleton in Drawer',
		story: () => <LayoutDrawer loading title="Form in loading in drawer" />,
	},
	{
		name: 'Skeleton in Drawer stacked',
		story: () => <LayoutDrawer loading title="Form in loading in drawer" stacked />,
	},
];

export default { stories };
