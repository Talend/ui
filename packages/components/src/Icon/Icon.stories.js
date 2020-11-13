import React from 'react';
import { storiesOf } from '@storybook/react';

import IconsProvider from '../IconsProvider';
import Icon from './Icon.component';

const testIcon = (
	<svg viewBox="0 0 20 20">
		<path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03" />
	</svg>
);
const newIcons = {
	test: testIcon,
};

const defaultIcons = {
	'talend-add': testIcon,
};

storiesOf('Messaging & Communication/Icon', module)
	.add('default use svg', () => (
		<div>
			<h1>Icon</h1>
			<IconsProvider>
				<p>
					The Icon component use the IconsProvider context. So this Icon is re-render when icons are
					loaded or updated.
				</p>
				<Icon name="talend-apache" />
				<IconsProvider.reactContext.Consumer>
					{value => (
						<>
							<p>We have {value.ids.length.toString()} svg icons registred:</p>
							<ul>
								{value.ids.map((icon, index) => (
									<li key={index}>
										<Icon name={icon} /> : <strong>{icon}</strong>
									</li>
								))}
							</ul>
						</>
					)}
				</IconsProvider.reactContext.Consumer>
			</IconsProvider>
		</div>
	))
	.add('fontawesome', () => (
		<div>
			<h1>Icon</h1>
			<IconsProvider>
				<p>You can use font awesome icons if you have loaded the stylesheet</p>
				<ul>
					<li>
						<Icon name="fa-bars" /> : <strong>fa-bars</strong>
					</li>
				</ul>
			</IconsProvider>
		</div>
	))
	.add('extends defaults', () => (
		<div>
			<h1>Icon</h1>
			<IconsProvider icons={newIcons}>
				<p>Here we are adding a new Icon id</p>
				<ul>
					<li>
						<Icon name="test" /> : <strong>test</strong>
					</li>
				</ul>
			</IconsProvider>
		</div>
	))
	.add('override defaults', () => (
		<div>
			<h1>Icon</h1>
			<IconsProvider defaultIcons={defaultIcons}>
				<p>Here we are changing the icon talend-add</p>
				<ul>
					<li>
						<Icon name="talend-add" /> : <strong>talend-add</strong>
					</li>
				</ul>
			</IconsProvider>
		</div>
	))
	.add('remote svg', () => (
		<div>
			<p>You can use Icon with a name starting with remote-. For example here we</p>
			<Icon name="remote-/svg/svg/brands/azure.svg" />
		</div>
	))
	.add('svg transform', () => (
		<div>
			<IconsProvider>
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
			</IconsProvider>
		</div>
	));
