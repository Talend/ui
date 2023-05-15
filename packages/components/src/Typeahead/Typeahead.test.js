import { mount } from 'enzyme';
// rewrite to use react-testing-library
import Typeahead from './Typeahead.component';
import { render, screen } from '@testing-library/react';

function getHeaders() {
	return document.querySelectorAll('.section-header');
}

describe('Typeahead', () => {
	const initialProps = {
		id: 'my-search',
		icon: {
			name: 'fa fa-search',
			title: 'icon',
		},
	};

	const items = [
		{
			title: 'category 1',
			icon: {
				name: 'fa fa-filter',
				title: 'icon',
			},
			suggestions: [
				{
					title: 'le title 1',
					description:
						'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
				},
				{
					title: 'title 2 les elephants elementaires ont des aile ',
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
	];

	const flatItems = [
		{ name: 'First item ', value: 'item-1' },
		{ name: 'Second item ', value: 'item-2' },
		{ name: 'Third item ', value: 'item-3' },
	];

	const noHeaderItems = [
		{
			suggestions: [
				{
					title: 'le title 1',
					description:
						'description: Uxoresque est in pacto est marito est hastam nomine in eos discessura incredibile tempus ardore.',
				},
				{
					title: 'title 2 les elephants elementaires ont des aile ',
					description:
						'description: Aut aut cum satis inter Epicuri quidem cum erat inquam controversia autem mihi utrumque Attico.',
				},
			],
		},
	];

	const itemsObjectWithStringId = [
		{
			title: 'category 1',
			suggestions: [
				{
					title: 'le title 1',
					value: 'letitle1',
				},
				{
					title: 'le title 1',
					value: 'letitle1copy',
				},
				{
					title: 'le title 2',
					value: 'letitle2',
				},
			],
		},
	];

	const itemsObjectWithId = [
		{
			title: 'category 1',
			suggestions: [
				{
					title: 'le title 1',
					value: 6,
				},
				{
					title: 'le title 1',
					value: 0,
				},
				{
					title: 'le title 2',
					value: 19,
				},
			],
		},
	];

	describe('toggle button', () => {
		it('should be hidden if docked property is not true', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: false,
			};

			// when
			render(<Typeahead {...props} />);
			// then
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});

		it('should be shown if docked property is true', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: true,
			};

			// when
			render(<Typeahead {...props} />);

			// then
			expect(screen.getByRole('button')).toBeVisible();
		});

		it('should call onToggle', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: true,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('Button.tc-typeahead-toggle').at(0).simulate('click');

			// then
			expect(props.onToggle).toBeCalled();
		});
	});

	describe('input', () => {
		it('should call onChange', () => {
			// given
			const onChange = jest.fn();
			const props = {
				...initialProps,
				onChange,
			};
			const typeahead = <Typeahead {...props} />;
			const event = { target: { value: 'toto' } };

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('input').simulate('change', event);

			// then
			expect(onChange).toBeCalled();
		});

		it('should call onBlur', () => {
			// given
			const onBlur = jest.fn();
			const props = {
				...initialProps,
				onBlur,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('input').simulate('blur');

			// then
			expect(onBlur).toBeCalled();
		});
	});

	describe('item', () => {
		it('should call onSelect', () => {
			// given
			const onSelect = jest.fn();
			const props = {
				...initialProps,
				onSelect,
				items,
			};
			const typeahead = <Typeahead {...props} />;

			// when
			const typeaheadInstance = mount(typeahead);
			typeaheadInstance.find('Item').at(0).simulate('click');

			// then
			expect(onSelect).toBeCalled();
		});

		it('should render typeahead selected item by id', () => {
			// given
			const props = {
				...initialProps,
				value: 'le title 1',
				valueId: '0',
				items: itemsObjectWithId,
				onChange: jest.fn(),
			};

			// when
			render(<Typeahead {...props} />);

			// then
			const titleList = screen.getAllByTitle('le title 1');
			expect(titleList[0]).not.toHaveClass('theme-selected');
			expect(titleList[1]).toHaveClass('theme-selected');
		});

		it('should render typeahead selected item by string id', () => {
			// given
			const props = {
				...initialProps,
				value: 'le title 1',
				valueId: 'letitle1copy',
				items: itemsObjectWithStringId,
				onChange: jest.fn(),
			};

			// when
			render(<Typeahead {...props} />);

			// then
			const titleList = screen.getAllByTitle('le title 1');
			expect(titleList[0]).not.toHaveClass('theme-selected');
			expect(titleList[1]).toHaveClass('theme-selected');
		});

		it('should render typeahead selected item by title', () => {
			// given
			const props = {
				id: 'my-search',
				value: 'le title 1',
				items: itemsObjectWithId,
				onChange: jest.fn(),
			};

			// when
			render(<Typeahead {...props} />);

			// then
			const titleList = screen.getAllByTitle('le title 1');
			expect(titleList[0]).toHaveClass('theme-selected');
			expect(titleList[1]).toHaveClass('theme-selected');
		});
	});
	it('should not display section header if there are no title or icon', () => {
		// given
		const props = {
			...initialProps,
			onToggle: jest.fn(),
			docked: false,
			items: noHeaderItems,
		};

		// when
		render(<Typeahead {...props} />);

		// then
		expect(getHeaders().length).toBe(0);
	});
	it('should display section header', () => {
		// given
		const props = {
			...initialProps,
			onToggle: jest.fn(),
			docked: false,
			items,
		};

		// when
		render(<Typeahead {...props} />);

		// then
		const headers = getHeaders();
		expect(headers.length).toBe(2);
		expect(headers[0]).toHaveTextContent('category 1');
		expect(headers[1]).toHaveTextContent('category 2');
	});

	describe('render flatItems', () => {
		it('should render empty if provided collection is null', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: false,
				items: null,
				multiSection: false,
			};

			// when
			render(<Typeahead {...props} />);

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});
		it('should render empty if provided collection is undefined', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: false,
				items: undefined,
				multiSection: false,
			};

			// when
			render(<Typeahead {...props} />);

			// then
			expect(screen.queryAllByRole('listitem').length).toBe(0);
		});
		it('should render Items with data-feature attribute if provided collection is flat', () => {
			// given
			const props = {
				...initialProps,
				onToggle: jest.fn(),
				docked: false,
				items: flatItems,
				dataFeature: 'smtg',
				multiSection: false,
			};

			// when
			render(<Typeahead {...props} />);

			// then
			const typeaheadInstance = screen.getByRole('listbox');
			expect(typeaheadInstance).toBeVisible();
			expect(typeaheadInstance.children.length).toBe(3);
			expect(typeaheadInstance.querySelectorAll('li>div')[0]).toHaveAttribute(
				'data-feature',
				'smtg.item-1',
			);
			expect(typeaheadInstance.querySelectorAll('li>div')[1]).toHaveAttribute(
				'data-feature',
				'smtg.item-2',
			);
			expect(typeaheadInstance.querySelectorAll('li>div')[2]).toHaveAttribute(
				'data-feature',
				'smtg.item-3',
			);
		});
	});
});
