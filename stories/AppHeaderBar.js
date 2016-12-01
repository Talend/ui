import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { AppHeaderBar } from '../src';

/*************************************** TYPEAHEAD ************************************************/
const exampleId = 'component-id';
const focusedItemIndex = 1;
const focusedSectionIndex = 0;
const value = 'le';
const renderItemData = { value };
const inputProps = {
	value,
	placeholder: 'Search anything',
};
const itemProps = {};
const typeaheadItems = [
	{
		title: 'category 1',
		icon: {
			name: 'fa fa-filter',
			title: 'icon'
		},
		suggestions: [
			{
				title: 'le title 1',
				description: 'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
			},
			{
				title: 'title 2 les elephants elementaires ont des aile ',
				description: 'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
			},
		],
	},

	{
		title: 'category 2',
		icon: {
			name: 'fa fa-asterisk',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'title 3',
				description: 'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
			},
		],
	},

	{
		title: 'category 3',
		icon: {
			name: 'fa fa-asterisk',
			title: 'icon',
		},
		suggestions: [
			{
				title: 'title 4',
				description: 'description: Praesentibus genero ne in Africani mandavi saepius ipsam C in libro et hoc Laeli cum.',
			},
			{
				title: 'title 5',
				description: 'description: Feceris unde tot illo tot clientes dederis numerando et indiscretus cum paria et unde ubi.',
			},
			{
				title: 'title 6',
				description: 'description: Gradu quos cedentium sunt appeterent ita ancoralia instar luna sunt etiam ubi incendente nihil observabant.',
			},
		],
	}];

const search = {
	id: exampleId,
	config: {
		icon: {
			name: 'fa fa-search',
			title: 'icon',
		},
	},
	items: typeaheadItems,
	inputProps,
	itemProps,
	focusedItemIndex,
	focusedSectionIndex,
	renderItemData,
};

/****************************************** FORM **************************************************/
const inputForm = {
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
					pullRight: true,
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
		buttonLabel: 'submit',
	}],
};

/************************************** AppHeaderBar Props ****************************************/
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
							item: {
								icon: 'fa fa-bars',
								name: 'hello',
								onClick: action('onClick bars')
							},
						},
					],
				},
				{
					nav: { pullRight: true },
					navItems: [
						{
							type: 'navItem',
							item: {
								icon: 'fa fa-heart',
								name: 'world',
								onClick: action('onClick heart')
							},
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
									{
										icon: 'fa fa-fw fa-cog',
										name: 'settings',
										onClick: action('onClick settings')
									},
								],
							},
						},
					],
				},
			],
		},
	],
};

storiesOf('App Header Bar', module)
	.addWithInfo('default', () => {
		props.content[1] && delete props.content[1];
		return (
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
		</div>);
	})

	.addWithInfo('Without brandLink', () => {
		const myprops = Object.assign({}, props);
		delete myprops.brandLink;
		myprops.content[1] && delete myprops.content[1];
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
	})

	.addWithInfo('With form', () => {
		props.content[1] = inputForm;
		return (
			<div>
				<AppHeaderBar {...props} />
				<div className="container" style={{ paddingTop: 40 }}>
					<h1>AppHeaderBar</h1>
					<h2>Definition</h2>
					<p>Display a navigation bar on top of the page.</p>
					<p>Look on top</p>
				</div>
			</div>
		);
	})

	.addWithInfo('With Typeahead Icon', () => {
		props.content[1] =
			{
				search: {
					id: exampleId,
					config: {
						isOnlyIcon: true,
						icon: {
							name: 'fa fa-search',
							title: 'icon',
							actionStyle: 'link',
						},
						onInputIconClick: action('icon clicked'),
					},
				},
			};
		return (
			<div>
				<AppHeaderBar {...props} />
				<div className="container" style={{ paddingTop: 40 }}>
					<h1>AppHeaderBar</h1>
					<h2>Definition</h2>
					<p>Display a navigation bar on top of the page.</p>
					<p>Look on top</p>
				</div>
			</div>
		);
	})

	.addWithInfo('With Typeahead only input', () => {
		props.content[1] = {
			search: {
				id: exampleId,
				config: {
					icon: {
						name: 'fa fa-search',
						title: 'icon',
					},
				},
				inputProps: inputProps,
				itemProps: itemProps,
				focusedItemIndex: focusedItemIndex,
				focusedSectionIndex: focusedSectionIndex,
				renderItemData: renderItemData,
			}
		};
		return (
			<div>
				<AppHeaderBar {...props} />
				<div className="container" style={{ paddingTop: 40 }}>
					<h1>AppHeaderBar</h1>
					<h2>Definition</h2>
					<p>Display a navigation bar on top of the page.</p>
					<p>Look on top</p>
				</div>
			</div>
		);
	})

	.addWithInfo('With Typeahead items', () => {
		props.content[1] = { search };
		return (
			<div>
				<AppHeaderBar {...props} />
				<div className="container" style={{ paddingTop: 40 }}>
					<h1>AppHeaderBar</h1>
					<h2>Definition</h2>
					<p>Display a navigation bar on top of the page.</p>
					<p>Look on top</p>
				</div>
			</div>
		);
	})
;
