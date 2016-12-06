import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Layout, Drawer } from '../src/index';

const content = (
	<div>
		<h1>Welcome to the content for testing scroll</h1>
		<ul>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
			<li>one</li>
		</ul>
	</div>
);

const header = {
	app: 'Example App Name',
};

storiesOf('Drawer', module)
	.addWithInfo('Default', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer>
				<h1>I am a drawer</h1>
			</Drawer>
			<Drawer>
				<h1>I am an other drawer</h1>
			</Drawer>
		</div>
	))
	.addWithInfo('custom classname', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer className="drawer-custom">
				<h1>I am a customized drawer</h1>
				<p>Using className props</p>
			</Drawer>
		</div>
	))
	.addWithInfo('custom styles', () => (
		<div>
			<h1>Hello world</h1>
			<Drawer style={{ width: 400, backgroundColor: '#ddd' }}>
				<h1>I am a custom drawer</h1>
				<p>Using style props</p>
			</Drawer>
		</div>
	));

