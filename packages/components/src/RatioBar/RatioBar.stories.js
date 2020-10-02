import React from 'react';
import { storiesOf } from '@storybook/react';

import { RatioBar, RatioBarLine } from './RatioBar.component';

const stories = storiesOf('Data/Dataviz/RatioBar', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('RatioBar default', () => (
		<div>
			<RatioBar>
				<RatioBarLine percentage={30}></RatioBarLine>
			</RatioBar>
		</div>
	));
