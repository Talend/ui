import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Emphasis } from '../src/index';

storiesOf('Emphasis', module)
	.addWithInfo('with value', () => (
		<div>
			<h1>With value</h1>
			<p>The emphasised text is returned (value = BroWn) :</p>
			<Emphasis value="BroWn" text="The quick brown fox jumps over the lazy dog" />


			<h1>Without value</h1>
			<p>The original text is returned :</p>
			<Emphasis text="The quick brown fox jumps over the lazy dog" />
		</div>
	));
