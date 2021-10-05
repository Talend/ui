import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Slider from './Slider.component';

const icons = [
	'talend-activity',
	'talend-most-trusted',
	'talend-network',
	'talend-streams',
	'talend-tdc-negative',
];

const style = {
	padding: '20px',
};

const delimiterStyle = {
	paddingTop: '25px',
	paddingBottom: '25px',
	borderBottom: '1px dashed grey',
};

const actions = [
	{
		id: 'icon1',
		label: 'Click Me',
		icon: 'talend-smiley-angry',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon2',
		label: 'Click Me',
		icon: 'talend-smiley-neutral',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon3',
		label: 'Click Me',
		icon: 'talend-smiley-satisfied',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon4',
		label: 'Click Me',
		icon: 'talend-smiley-satisfied',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
	{
		id: 'icon5',
		label: 'Click Me',
		icon: 'talend-smiley-satisfied',
		'data-feature': 'action',
		link: true,
		hideLabel: true,
	},
];

const functionToFormat = value => `${value}-test`;
const functionFormatFloor = value => `${Math.floor(value)}`;

storiesOf('Form/Controls/Slider', module).add('default', () => (
	<section>
		<div style={style}>
			<div style={delimiterStyle}>
				<p>By default</p>
				<Slider onChange={action('onChange')} />
			</div>
			<div style={delimiterStyle}>
				<p>With value</p>
				<Slider onChange={action('onChange')} value={10} />
			</div>
			<div style={delimiterStyle}>
				<p>Greater than usage</p>
				<Slider
					max={10}
					min={0}
					mode={Slider.MODES.GREATER_THAN}
					onChange={action('onChange')}
					value={3}
				/>
			</div>
			<div style={delimiterStyle}>
				<p>Equals</p>
				<Slider
					max={10}
					min={0}
					mode={Slider.MODES.EQUALS}
					onChange={action('onChange')}
					value={5}
				/>
			</div>
			<div style={delimiterStyle}>
				<p>With disabled</p>
				<Slider onChange={action('onChange')} disabled />
			</div>
			<div style={delimiterStyle}>
				<p>With value & format</p>
				<Slider
					id="selectable"
					onChange={action('onChange')}
					captionsFormat={functionToFormat}
					value={10}
				/>
			</div>
			<div style={delimiterStyle}>
				<p>With icons</p>
				<Slider onChange={action('onChange')} captionIcons={icons} />
			</div>
			<div style={delimiterStyle}>
				<p>with icon buttons</p>
				<Slider onChange={action('onChange')} captionActions={actions} value={50} />
			</div>
			<div style={delimiterStyle}>
				<p>with step number</p>
				<Slider
					onChange={action('onChange')}
					value={25}
					captionTextStepNumber={5}
					captionsFormat={functionFormatFloor}
				/>
			</div>
			<div style={delimiterStyle}>
				<p>with range (inclusive)</p>
				<Slider
					onChange={action('onChange')}
					min={0}
					max={100}
					value={[25, 75]}
					allowCross={false}
				/>
			</div>
			<div style={delimiterStyle}>
				<p>with range (exclusive)</p>
				<Slider
					onChange={action('onChange')}
					min={0}
					max={100}
					mode={Slider.MODES.EXCLUSIVE}
					value={[25, 75]}
					allowCross={false}
				/>
			</div>
		</div>
	</section>
));
