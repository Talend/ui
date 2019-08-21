import React from 'react';
import { storiesOf } from '@storybook/react';

import { RelativeDate, IconsProvider } from '../src/index';

storiesOf('RelativeDate', module)
	.add('default', () => (
		<div>
			<IconsProvider />
			<p>
				A simple date that was <RelativeDate date="2019-05-05 15:10:30" />
			</p>
			<p>
				A date with an icon that was <RelativeDate date={(new Date()) - 60 * 1000} withIcon />
			</p>
		</div>
	));
