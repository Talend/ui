import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { AppHeaderBar } from '../src';

const props = {
	app: 'Example App Name',
	brandLink: {
		onClick: action('brandonClick'),
	},
	content: [
		{
			navs: [
				{
					navItems: [
						{
							type: 'navItem',
							item: { icon: 'fa fa-bars', name: 'hello', onClick: action('onClick bars') },
						},
					],
				},
				{
					nav: { pullRight: true },
					navItems: [
						{
							type: 'navItem',
							item: { icon: 'fa fa-heart', name: 'world', onClick: action('onClick heart') },
						},
						{
							type: 'dropdown',
							item: {
								dropdown: {
									id: 'myDropdown',
									title: 'user 1',
									onSelect: action('dropdown onSelect'),
								},
								items: [
									{ icon: 'fa fa-fw fa-cog', name: 'settings', onClick: action('onClick settings') },
								],
							},
						},
					],
				},
			],
		},
		{
			forms: [{
				form: {
					pullRight: true,
					onSubmit: action('onSubmit'),
					role: 'search',
				},
				formgroups: [
					{
						formgroup: {
							controlId: 'globalSearch',
						},
						formcontrol: {
							type: 'text',
							placeholder: 'search anything',
							onChange: action('onChange in search'),
						},
					},
				],
				button: {
					onClick: action('onClick form'),
					bsStyle: 'link',
				},
				icon: 'fa fa-search',
			}],
		},
	],
};

storiesOf('App Header Bar', module)
	.addWithInfo('default', () => (
		<div>
			<AppHeaderBar {...props} />
			<div className="container" style={{ paddingTop: 40 }}>
				<h1>AppHeaderBar</h1>
				<h2>Definition</h2>
				<p>Display a navigation bar on top of the page.</p>
				<h2>Examples</h2>
				<p>Look on top</p>
				<pre>{JSON.stringify(props, null, 2)}</pre>
			</div>
		</div>
	))
	.addWithInfo('without brandLink', () => {
		const myprops = Object.assign({}, props);
		delete myprops.brandLink;
		return (
			<div>
				<AppHeaderBar {...myprops} />
				<div className="container" style={{ paddingTop: 40 }}>
					<h1>AppHeaderBar</h1>
					<h2>Definition</h2>
					<p>Display a navigation bar on top of the page.</p>
					<p>Look on top</p>
				</div>
			</div>
		);
	});
