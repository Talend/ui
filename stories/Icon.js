import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Icon } from '../src/index';

Icon.register('svg-test', (<svg viewBox="0 0 20 20"><path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03" /></svg>));

storiesOf('Icon', module)
	.addWithInfo('default', () => (
		<div>
			<h1>Icon</h1>
			<h2>Definition</h2>
			<p>The Icon component displays an icon (sic).</p>
			<p>If Icon starts with fa -&gt; font awesome</p>
			<p>If Icon starts with icon- -&gt; font custom</p>
			<p>If Icon name is registred -&gt; svg icon</p>
			<h2>Examples</h2>
			<Icon name="fa fa-bars" />
			<Icon name="fa-bars" />
			<Icon name="svg-test" />
		</div>
	));
