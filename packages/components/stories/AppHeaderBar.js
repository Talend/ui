import React from 'react';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';

import { IconsProvider, AppHeaderBar } from '../src';

const icons = {
	'talend-world': talendIcons['talend-world'],
	'talend-burger': talendIcons['talend-burger'],
};

const typeaheadItems = [
	{
		title: 'category 1',
		icon: {
			name: 'fa fa-filter',
			title: 'icon',
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
								icon: 'talend-burger',
								label: 'Hello',
								name: 'hello',
								onClick: action('onClick bars'),
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
								icon: 'talend-world',
								label: 'World',
								name: 'world',
								onClick: action('onClick heart'),
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
										onClick: action('onClick settings'),
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

const decoratedStories = storiesOf('AppHeaderBar', module)
	.addDecorator(story => (
		<div>
			{story()}
			<IconsProvider defaultIcons={icons} />
			<div className="container" style={{ paddingTop: 40 }} />
		</div>
	));

if (!decoratedStories.addWithInfo) {
	decoratedStories.addWithInfo = decoratedStories.add;
}

decoratedStories
	.addWithInfo('default', () => {
		if (props.content[1]) {
			delete props.content[1];
		}
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('without brand link', () => {
		delete props.brandLink;
		if (props.content[1]) {
			delete props.content[1];
		}
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('with simple form', () => {
		props.content[1] = inputForm;
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('with search button', () => {
		props.content[1] = {
			search: {
				icon: {
					name: 'fa fa-search',
					title: 'icon',
					bsStyle: 'link',
				},
				onToggle: action('icon clicked'),
			},
		};
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('with search input', () => {
		props.content[1] = {
			search: {
				icon: {
					name: 'fa fa-search',
				},
				placeholder: 'Search...',
				onBlur: action('onBlur'),
				onChange: action('onChange'),
			},
		};
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('while searching', () => {
		props.content[1] = {
			search: {
				icon: {
					name: 'fa fa-search',
				},
				value: 'le',
				searching: true,
				onBlur: action('onBlur'),
				onChange: action('onChange'),
			},
		};
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('with search results', () => {
		props.content[1] = {
			search: {
				icon: {
					name: 'fa fa-search',
				},
				value: 'le',
				items: typeaheadItems,
				onBlur: action('onBlur'),
				onChange: action('onChange'),
				onSelect: action('onSelect'),
			},
		};
		return <AppHeaderBar {...props} />;
	})
	.addWithInfo('with no search result', () => {
		props.content[1] = {
			search: {
				icon: {
					name: 'fa fa-search',
				},
				value: 'le',
				items: [],
				onBlur: action('onBlur'),
				onChange: action('onChange'),
			},
		};
		return <AppHeaderBar {...props} />;
	});
