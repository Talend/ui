import React from 'react';
import { storiesOf } from '@storybook/react';

import IconsProvider from '../IconsProvider';
import Icon from './Icon.component';

// todo build it base on the icons info
const icons = {};

storiesOf('Messaging & Communication/Icon', module)
	.add('default use svg', () => (
		<div>
			<h1>Icon</h1>
			<IconsProvider />
			<p>We have {Object.keys(icons).length.toString()} svg icons registred:</p>
			<ul>
				{Object.keys(icons).map((icon, index) => (
					<li key={index}>
						<Icon name={icon} /> : <strong>{icon}</strong>
					</li>
				))}
			</ul>
		</div>
	))
	.add('fontawesome', () => (
		<div>
			<h1>Icon</h1>
			<IconsProvider />
			<p>You can use font awesome icons if you have loaded the stylesheet</p>
			<ul>
				<li>
					<Icon name="fa-bars" /> : <strong>fa-bars</strong>
				</li>
			</ul>
		</div>
	))
	.add('svg transform', () => (
		<div>
			<IconsProvider />
			<p>Here we are changing the icon talend-apache</p>
			<ul>
				<li>
					<Icon name="talend-apache" />
				</li>
				<li>
					<Icon name="talend-apache" transform="spin" /> : <strong>spin</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-45" /> : <strong>rotate-45</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-90" /> : <strong>rotate-90</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-135" /> : <strong>rotate-135</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-180" /> : <strong>rotate-180</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-225" /> : <strong>rotate-225</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-270" /> : <strong>rotate-270</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="rotate-315" /> : <strong>rotate-315</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="flip-horizontal" /> :{' '}
					<strong>flip-horizontal</strong>
				</li>
				<li>
					<Icon name="talend-apache" transform="flip-vertical" /> : <strong>flip-vertical</strong>
				</li>
			</ul>
		</div>
	));
