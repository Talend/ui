import React from 'react';
import { storiesOf } from '@storybook/react';

import { LoaderApp } from '../src/';

storiesOf('LoaderApp', module)
	.addWithInfo('default', () => <LoaderApp />);
