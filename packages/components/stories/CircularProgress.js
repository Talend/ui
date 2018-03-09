import React from 'react';
import { storiesOf, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

import { CIRCULAR_PROGRESS_SIZE as SIZE, CircularProgress } from '../src';

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
			<CircularProgress size={SIZE.small} />
			<h3>Small on color</h3>
			<div style={{ background: '#2f5157' }}>
				<CircularProgress light size={SIZE.small} />
			</div>
			<h3>Normal</h3>
			<CircularProgress size={SIZE.default} />
			<h3>large</h3>
			<CircularProgress size={SIZE.large} />
			<h3>on color</h3>
			<div style={{ background: '#2f5157' }}>
				<CircularProgress light size={SIZE.large} />
			</div>
      <h3>xlarge</h3>
      <CircularProgress size={SIZE.xlarge} />
			<h3>Small with percent</h3>
			<CircularProgress size={SIZE.small} percent="30" />
			<h3>Normal with percent</h3>
			<CircularProgress size={SIZE.default} percent="50" />
			<h3>Large with percent</h3>
			<CircularProgress size={SIZE.large} percent="70" />
      <h3>xlarge with percent</h3>
      <CircularProgress size={SIZE.xlarge} percent="90" />
		</div>
	));
