import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { Icon } from '../src/index';

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
			<p>We have {Object.keys(Icon.registry).length.toString()} svg icons registred:</p>
			<ul>
			{Object.keys(Icon.registry).map((icon, index) => (
				<li><Icon name={icon} key={index} /> : <strong>{icon}</strong></li>
			))}
			</ul>
			<p>You can use font awesome icons if you have loaded the stylesheet</p>
			<ul>
				<li><Icon name="fa-bars" /> : <strong>fa-bars</strong></li>
			</ul>

		</div>
	));
