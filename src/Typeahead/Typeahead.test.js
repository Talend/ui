import React from 'react';
import { shallow, mount } from 'enzyme';
import Typeahead from './Typeahead.component';


describe('Typeahead events', () => {
	const exampleId = 'component-id';
	const focusedItemIndex = 1;
	const focusedSectionIndex = 0;
	const value = '';
	const renderItemData = { value };
	const inputProps = {
		value,
		placeholder: 'Search anything',
	};

	const itemProps = {};

	const items = [
		{
			title: 'category 1',
			icon: {
				name: 'fa fa-filter',
				title: 'icon',
			},
			suggestions: [{
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
		}];

	const onlyIconProps = {
		id: exampleId,
		config: {
			isOnlyIcon: true,
			icon: {
				name: 'fa fa-search',
				title: 'icon',
				actionStyle: 'link',
			},
			onInputIconClick: jest.fn(),
		},
		items: [],
	};

	const typeaheadProps = {
		id: exampleId,
		config: {
			icon: {
				name: 'fa fa-search',
				title: 'icon',
			},
		},
		items,
		inputProps,
		itemProps,
		focusedItemIndex,
		focusedSectionIndex,
		renderItemData,
	};

	describe('only icon', () => {
		it('should call onClick event', () => {
			// given
			const myProps = Object.assign({}, onlyIconProps);
			const iconClick = jest.fn();
			myProps.config.onInputIconClick = iconClick;
			const typeaheadIcon = <Typeahead {...myProps} />;

			// when
			const typeaheadIconInstance = shallow(typeaheadIcon);
			typeaheadIconInstance.simulate('click');

			// then
			expect(iconClick).toBeCalled();
		});
	});

	describe('Autowhatever', () => {
		describe('input events:', () => {
			it('should call onKeydown event', () => {
				// given
				const onKeyDown = jest.fn();
				typeaheadProps.inputProps = { onKeyDown, ...inputProps };
				const typeaheadLeft = <Typeahead {...typeaheadProps} />;

				// when
				const typeaheadLeftInstance = mount(typeaheadLeft);
				typeaheadLeftInstance.find('input').simulate('keydown');

				// then
				expect(onKeyDown).toBeCalled();
			});

			it('should call onBlur event', () => {
				// given
				const onBlur = jest.fn();
				typeaheadProps.inputProps = { onBlur, ...inputProps };
				const typeaheadLeft = <Typeahead {...typeaheadProps} />;

				// when
				const typeaheadLeftInstance = mount(typeaheadLeft);
				typeaheadLeftInstance.find('input').simulate('blur');

				// then
				expect(onBlur).toBeCalled();
			});
		});

		describe('item events:', () => {
			it('should call onMouseEnter event', () => {
				// given
				const onMouseEnter = jest.fn();
				typeaheadProps.itemProps = { onMouseEnter, ...itemProps };
				const typeaheadLeft = <Typeahead {...typeaheadProps} />;

				// when
				const typeaheadLeftInstance = mount(typeaheadLeft);
				typeaheadLeftInstance.find('Item').at(0).simulate('mouseenter');

				// then
				expect(onMouseEnter).toBeCalled();
			});

			it('should call onMouseLeave event', () => {
				// given
				const onMouseLeave = jest.fn();
				typeaheadProps.itemProps = { onMouseLeave, ...itemProps };
				const typeaheadLeft = <Typeahead {...typeaheadProps} />;

				// when
				const typeaheadLeftInstance = mount(typeaheadLeft);
				typeaheadLeftInstance.find('Item').at(0).simulate('mouseleave');

				// then
				expect(onMouseLeave).toBeCalled();
			});

			it('should call onClick event', () => {
				// given
				const onClick = jest.fn();
				typeaheadProps.itemProps = { onClick, ...itemProps };
				const typeaheadLeft = <Typeahead {...typeaheadProps} />;

				// when
				const typeaheadLeftInstance = mount(typeaheadLeft);
				typeaheadLeftInstance.find('Item').at(0).simulate('click');

				// then
				expect(onClick).toBeCalled();
			});

			it('should call onKeyDown event', () => {
				// given
				const onKeyDown = jest.fn();
				typeaheadProps.itemProps = { onKeyDown, ...itemProps };
				const typeaheadLeft = <Typeahead {...typeaheadProps} />;

				// when
				const typeaheadLeftInstance = mount(typeaheadLeft);
				typeaheadLeftInstance.find('Item').at(0).simulate('keydown');

				// then
				expect(onKeyDown).toBeCalled();
			});
		});
	});
});
