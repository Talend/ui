import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Drawer } from '@talend/react-components';
import { UIForm } from '../src/UIForm';

const simple = require('./json/concepts/core-simple.json');

function LayoutDrawer({ title, stacked, ...props }) {
	const drawers = [
		<Drawer.Container stacked={stacked}>
			<UIForm {...props} />
		</Drawer.Container>,
	];
	return (
		<Layout drawers={drawers} mode="TwoColumns">
			<div style={{ margin: 10 }}>
				<h1>{title}</h1>
				<p>To use a UIForm in a drawer you just have to create your component this way:</p>
				<code>{'<Drawer.Container><UIForm {...props} /></Drawer.Container>'}</code>
			</div>
		</Layout>
	);
}
LayoutDrawer.propTypes = {
	title: PropTypes.string,
	stacked: PropTypes.bool,
};

export default [
	{
		name: 'default',
		story: () => (
			<div>
				<h1>Form by default take 100% with of the container</h1>
				<UIForm {...simple} />
			</div>
		),
	},
	{ name: 'drawer', story: () => <LayoutDrawer title="UIForm in a drawer" {...simple} /> },
	{
		name: 'drawer-stacked',
		story: () => <LayoutDrawer title="UIForm in a drawer" {...simple} stacked />,
	},
];
