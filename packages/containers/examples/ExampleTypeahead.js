import React from 'react';

import { Typeahead } from '../src';

const view = {
	icon: {
		name: 'talend-search',
		title: 'Toggle search input',
		bsStyle: 'link',
		tooltipPlacement: 'bottom',
	},
	items: [
		{
			title: 'category 1',
			icon: {
				name: 'talend-filter',
				title: 'icon',
			},
			suggestions: [
				{
					title: 'le title 1',
					description:
						'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
				},
				{
					title: 'title 2 Les elephants elementaires ont des aile ',
					description:
						'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
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
					description:
						'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
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
					description:
						'description: Praesentibus genero ne in Africani mandavi saepius ipsam C in libro et hoc Laeli cum.',
				},
				{
					title: 'title 5',
					description:
						'description: Feceris unde tot illo tot clientes dederis numerando et indiscretus cum paria et unde ubi.',
				},
				{
					title: 'title 6',
					description:
						'description: Gradu quos cedentium sunt appeterent ita ancoralia instar luna sunt etiam ubi incendente nihil observabant.',
				},
				{
					title: 'without description',
				},
				{
					description: 'without title',
				},
			],
		},
	],
};

const ExampleTypeahead = {
	default: () => (
		<div>
			<Typeahead {...view} />
		</div>
	),
};

export default ExampleTypeahead;
