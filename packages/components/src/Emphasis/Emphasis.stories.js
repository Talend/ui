import React from 'react';
import { storiesOf } from '@storybook/react';

import Emphasis from './Emphasis.component';

storiesOf('Design Principles/Typography/Emphasis', module).add('with value', () => (
	<div>
		<h1>With value</h1>
		<p>The emphasised text is returned (value = BroWn) :</p>
		<Emphasis value="BroWn" text="The quick brown fox jumps over the lazy dog" />

		<h1>Without value</h1>
		<p>The original text is returned :</p>
		<Emphasis text="The quick brown fox jumps over the lazy dog" />

		<h1>With multiple occurences</h1>
		<p>The emphasised text is returned (value = lazy) :</p>
		<Emphasis value="lazy" text="The lazy quick brown fox jumps over the lazy dog" />
	</div>
));
