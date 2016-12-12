/** TYPEAHEAD */
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
];

export const search = {
	id: 'my-search',
	icon: {
		name: 'fa fa-search',
		title: 'icon',
	},
	value: 'le',
	placeholder: 'Search anything',
	items: typeaheadItems,
};

/** FORM */
export const inputForm = {
	forms: [{
		form: {
			pullRight: true,
			onSubmit: jest.fn(),
		},
		formgroups: [
			{
				formgroup: {
					controlId: 'globalSearch',
				},
				formcontrol: {
					type: 'text',
					placeholder: 'search anything',
					onChange: jest.fn(),
				},
			},
		],
		button: {
			onClick: jest.fn(),
		},
		buttonLabel: 'Save',
	}],
};

export const props = {
	app: 'Example App Name',
	brandLink: {
		title: 'my brand title',
		className: 'my-brand-class',
		onClick: jest.fn(),
	},
	content: [
		{
			navs: [
				{
					navItems: [
						{
							type: 'navItem',
							item: { icon: 'fa fa-bars', name: 'hello', onClick: jest.fn() },
						},
					],
				},
				{
					nav: { pullRight: true },
					navItems: [
						{
							type: 'navItem',
							item: { icon: 'fa fa-heart', name: 'world', onClick: jest.fn() },
						},
						{
							type: 'dropdown',
							item: {
								dropdown: {
									id: 'myDropdown',
									title: 'user 1',
									onSelect: jest.fn(),
								},
								items: [
									{
										icon: 'fa fa-fw fa-cog',
										name: 'settings',
										onClick: jest.fn(),
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
