import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { VirtualTree, IconsProvider } from '../src/index';
import { Nodes } from '../src/TreeView/data';
import LargeData from '../src/VirtualTree/heavy_data';

const style = { width: '300px', height: '300px', border: '1px solid #eee', marginLeft: '10px' };

storiesOf('VirtualTree', module)
	.add('default', () => (
		<div>
			<h1>VirtuallTree</h1>
			<h3>Definition</h3>
			<p>A view component to display any tree structure, well</p>
			<div style={style}>
				<IconsProvider />
				<form id="x" style={{ width: '500px', height: '500px' }}>
					<VirtualTree nodes={Nodes} />
				</form>
			</div>
		</div>
	))
	.add('enlarge your data', () => (
		<div>
			<h1>VirtuallTree</h1>
			<h3>Definition</h3>
			<p>A view component to display any tree structure, well</p>
			<div style={style}>
				<IconsProvider />
				<form id="x" style={{ width: '500px', height: '500px' }}>
					<VirtualTree nodes={LargeData} fast />
				</form>
			</div>
		</div>
	));
