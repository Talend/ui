import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

import { CircularProgress } from '../src';

setAddon(infoAddon);

storiesOf('CircularProgress', module)
	.addWithInfo('default', () => (
		<div>
			<h1>CircularProgress</h1>
			<h2>Definition</h2>
			<p>Show a spinning progress indicator</p>
			<h2>Examples</h2>
			<p>By default :</p>
			<CircularProgress />
			<h3>Small</h3>
			<CircularProgress size="small" />
			<h3>Small on color</h3>
			<div style={{ background: '#2f5157' }}>
				<CircularProgress light size="small" />
			</div>
			<h3>Normal</h3>
			<CircularProgress size="default" />
			<h3>large</h3>
			<CircularProgress size="large" />
			<h3>on color</h3>
			<div style={{ background: '#2f5157' }}>
				<CircularProgress light size="large" />
			</div>
			<h3>Small with percent</h3>
			<CircularProgress size="small" percent="30" />
			<h3>Normal with percent</h3>
			<CircularProgress size="default" percent="50" />
			<h3>Large with percent</h3>
			<CircularProgress size="large" percent="70" />
		</div>
	));
