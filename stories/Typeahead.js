import Autowhatever from 'react-autowhatever';
import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { FormControl, Nav } from 'react-bootstrap';
import { Typeahead } from '../src';

const exampleId = 'component-id';
const focusedItemIndex = 1;
const focusedSectionIndex = 0;
const value = 'le';
const renderItemData = { value };

const items = [
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
		]
	},

	{
		title: 'category 2',
		icon: {
			name: 'fa fa-asterisk',
			title: 'icon'
		},
		suggestions: [
			{
				title: 'title 3',
				description: 'description: In sanciatur libere audeamus exspectemus amicitia et dum ne audeamus causa monendum honesta studium valeat.',
			},
		]
	},

	{
		title: 'category 3',
		icon: {
			name: 'fa fa-asterisk',
			title: 'icon'
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
		]
	}];

let inputProps = {
	value,
	placeholder: 'Search anything',
};

// Input actions
const inputActionsList = ['onBlur', 'onKeyDown']; // TODO it is nice to have onChange event when the value is already given
inputProps = inputActionsList.reduce(
	(accumulator, funcName) =>
		Object.assign(accumulator, { [funcName]: action(`${funcName} event on input is triggered`) })
	, inputProps
);

// Item actions
const itemActionsList = ['onMouseEnter', 'onMouseLeave', 'onClick', 'onKeyDown'];
const itemProps = itemActionsList.reduce(
	(accumulator, funcName) =>
		Object.assign(accumulator, { [funcName]: action(`${funcName} event on item in the list is triggered`) })
	, {}
);

const props = {
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
	items: [],
};

storiesOf('Typeahead', module)
	.addWithInfo('Only Icon', () => {
		return (
			<div>
				<h2>Below is an example of a Typeahead</h2>
				<Typeahead {...props} />
			</div>
		);
	})

	.addWithInfo('Typeahead With Icon (LEFT ==> RIGHT)', () => {
		const myProps = Object.assign({}, props);
		myProps.config = {
			icon: {
				name: 'fa fa-search',
				title: 'icon',
			},
		};
		myProps.items = items;
		myProps.inputProps = inputProps;
		myProps.itemProps = itemProps;
		myProps.focusedItemIndex = focusedItemIndex;
		myProps.focusedSectionIndex = focusedSectionIndex;
		myProps.renderItemData = renderItemData;
		return (
			<div>
				<h2>Below is an example of a Typeahead</h2>
				<Typeahead {...myProps} />
			</div>
		);
	})

	.addWithInfo('Typeahead With Icon (RIGHT ==> LEFT)', () => {
		const myProps = Object.assign({}, props);
		myProps.config = {
			isOnTheRight: true,
			icon: {
				name: 'fa fa-search',
				title: 'icon',
			}
		};
		myProps.items = items;
		myProps.inputProps = inputProps;
		myProps.itemProps = itemProps;
		myProps.focusedItemIndex = focusedItemIndex;
		myProps.focusedSectionIndex = focusedSectionIndex;
		myProps.renderItemData = renderItemData;
		return (
			<div>
				<h2>Below is an example of a Typeahead</h2>
				<Typeahead {...myProps} />
			</div>
		);
	})

	.addWithInfo('Typeahead Without Icon (LEFT ==> RIGHT)', () => {
		const myProps = Object.assign({}, props);
		myProps.config = {};
		myProps.items = items;
		myProps.inputProps = inputProps;
		myProps.itemProps = itemProps;
		myProps.focusedItemIndex = focusedItemIndex;
		myProps.focusedSectionIndex = focusedSectionIndex;
		myProps.renderItemData = renderItemData;
		return (
			<div>
				<h2>Below is an example of a Typeahead</h2>
				<Typeahead {...myProps} />
			</div>
		);
	})

	.addWithInfo('Typeahead Without Icon (RIGHT ==> LEFT)', () => {
		const myProps = Object.assign({}, props);
		myProps.config = { isOnTheRight: true };
		myProps.items = items;
		myProps.inputProps = inputProps;
		myProps.itemProps = itemProps;
		myProps.focusedItemIndex = focusedItemIndex;
		myProps.focusedSectionIndex = focusedSectionIndex;
		myProps.renderItemData = renderItemData;
		return (
			<div>
				<h2>Below is an example of a Typeahead</h2>
				<Typeahead {...myProps} />
			</div>
		);
	})

	.addWithInfo('Typeahead With Icon & no items', () => {
		const myProps = Object.assign({}, props);
		myProps.config = {
			icon: {
				name: 'fa fa-search',
				title: 'icon',
			}
		};
		myProps.inputProps = inputProps;
		return (
			<div>
				<h2>Below is an example of a Typeahead</h2>
				<Typeahead {...myProps} />
			</div>
		);
	})
;
