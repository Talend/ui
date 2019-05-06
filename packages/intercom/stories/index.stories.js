import React from 'react';

import { storiesOf } from '@storybook/react';

import Intercom from '../src/Intercom.component';

const config = { app_id: 'fyq3wodw' };

storiesOf('Intercom', module).add('default', () => <Intercom id="intercom" config={config} />);
