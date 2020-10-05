import React from 'react';
import { storiesOf } from '@storybook/react';

import { RatioBarComposition } from './RatioBarComposition.component';
import { FilledLine, EmptyLine } from './RatioBarLines.component';

const t = () => 'test';

const stories = storiesOf('Data/Dataviz/RatioBar', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('RatioBar default', () => (
		<div>
			<RatioBarComposition>
				<FilledLine percentage={30} t={t} value={30}></FilledLine>
				<EmptyLine percentage={70} t={t} value={70}></EmptyLine>
			</RatioBarComposition>
		</div>
	));
