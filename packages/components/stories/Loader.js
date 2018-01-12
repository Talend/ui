import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loader } from '../src/';


storiesOf('Loader', module)
	.addWithInfo('default', () => (
		<section>
			<Loader />
		</section>
	));
