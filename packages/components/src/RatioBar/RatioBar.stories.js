import React from 'react';
import { storiesOf } from '@storybook/react';

import { RatioBar } from './RatioBar.component';

import { RatioBarComposition } from './RatioBarComposition.component';
import {
	QualityEmptyLine,
	QualityInvalidLine,
	QualityValidLine,
} from '../QualityBar/QualityRatioBar.component';

const t = () => 'test';

const stories = storiesOf('Data/Dataviz/RatioBar', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('RatioBar default', () => (
		<div>
			<section>
				<header>Ratio Bar</header>
				<div>
					<RatioBar amount={10} total={12} />
					<RatioBar amount={0} total={12} />
					<RatioBar amount={12} total={12} />
					<RatioBar amount={532} total={1000} />
				</div>
			</section>
			<section>
				<header>Quality Bar</header>
				<div>
					<RatioBarComposition>
						<QualityEmptyLine value={30} percentage={30} t={t} />
						<QualityInvalidLine value={40} percentage={40} t={t} />
						<QualityValidLine value={30} percentage={30} t={t} />
					</RatioBarComposition>
				</div>
			</section>
		</div>
	));
