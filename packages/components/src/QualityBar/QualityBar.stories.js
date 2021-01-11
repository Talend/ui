import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { QualityBar } from './QualityBar.component';

const stories = storiesOf('Data/Dataviz/QualityBar', module);
stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.add('Quality bar', () => (
		<div>
			<section>
				<header>Quality Bar</header>
				<div>
					<div>Homogeneous Quality</div>
					<QualityBar invalid={30} valid={30} empty={30} />
					<div>Very invalid</div>
					<QualityBar invalid={30} valid={0} empty={0} />
					<div>Best quality ever</div>
					<QualityBar invalid={0} valid={30} empty={0} />
					<div>Nothing to see here</div>
					<QualityBar invalid={0} valid={0} empty={30} />
					<div>Invalid and Empty</div>
					<QualityBar invalid={0} valid={30} empty={30} />
					<div>Classic look</div>
					<QualityBar invalid={2} valid={88} empty={3} />
					<div>Classic look (again yep)</div>
					<QualityBar invalid={122} valid={1088} empty={293} />
					<div>I really like the digits !</div>
					<QualityBar invalid={30} valid={30} empty={30} digits={5} />
					<div>Classic look with action button</div>
					<QualityBar
						invalid={2}
						valid={88}
						empty={3}
						onClick={action('onClickAction')}
						getDataFeature={qualityType => {
							return `data-feature.${qualityType}`;
						}}
					/>
				</div>
			</section>
		</div>
	));
