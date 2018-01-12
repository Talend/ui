import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Loader } from '../src/';


storiesOf('Loader', module)
	.addWithInfo('default', () => (
		<section>
			<Loader />
		</section>
	));
