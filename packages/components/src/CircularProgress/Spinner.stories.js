import React from 'react';
import { storiesOf } from '@storybook/react';

import CircularProgress from './CircularProgress.component';

storiesOf('Design Principles/Loading Feedback/Spinner', module).add('default', () => (
	<div>
		<h3>Default</h3>
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
		<CircularProgress size="small" percent={30} />
		<h3>Normal with percent</h3>
		<CircularProgress size="default" percent={50} />
		<h3>Large with percent</h3>
		<CircularProgress size="large" percent={70} />
	</div>
));
