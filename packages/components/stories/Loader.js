import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Loader, CIRCULAR_PROGRESS_SIZE as SIZE } from '../src/';

storiesOf('Loader', module)
	.addWithInfo('default', () => (
		<section>
			<Loader />
		</section>
	))
	.addWithInfo('small', () => (
		<section>
			<Loader size={SIZE.small} />
		</section>
	))
	.addWithInfo('large', () => (
		<section>
			<Loader size={SIZE.large} />
		</section>
	));
