import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
// rewrite tests using react-testing-library
import { screen, render, fireEvent } from '@testing-library/react';
import { AddFacetPopover } from './AddFacetPopover.component';
import getDefaultT from '../../translate';

const t = getDefaultT();

describe('AddFacetPopover', () => {
	const badges = [];
	const badgesDefinitions = [
		{
			properties: {
				initialOpenedOperator: true,
				initialOpenedValue: false,
				attribute: 'name',
				label: 'Name',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', '='],
			},
		},
		{
			properties: {
				initialOpenedOperator: true,
				initialOpenedValue: false,
				attribute: 'connection.name',
				label: 'Connection name',
				operator: {},
				operators: [],
				type: 'checkbox',
			},
			metadata: {
				badgePerFacet: '1',
				entitiesPerBadge: '1',
				operators: ['in'],
				values: [
					{ id: 'amazon_s3', label: 'Amazon S3' },
					{ id: 'hdfs', label: 'HDFS' },
					{ id: 'kafka', label: 'Kafka' },
				],
			},
		},
		{
			properties: {
				attribute: 'target',
				initialOperatorOpened: true,
				initialValueOpened: false,
				label: 'Target',
				operator: {},
				operators: [],
				type: 'text',
			},
			metadata: {
				category: 'Custom attributes',
				badgePerFacet: 'N',
				entitiesPerBadge: '1',
				operators: ['contains', 'equals', 'notEquals', 'match a regexp'],
			},
		},
	];

	const getRowButtons = wrapper => {
		if (wrapper) {
			return wrapper.find('div.tc-add-facet-popover-row-container').find('button');
		}
		return document.querySelectorAll('div.tc-add-facet-popover-row-container button');
	};

	it('should render', () => {
		// Given
		const props = {
			badges,
			initialFilterValue: '',
			badgesDefinitions,
			id: 'my id',
			onClick: jest.fn(),
			t,
		};
		// When
		const { container } = render(<AddFacetPopover {...props} />);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render the some badge row, with connection in their attribute', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);
		// Then
		fireEvent.change(document.querySelector('input'), { target: { value: 'connection' } });
		const rowButton = getRowButtons();
		expect(rowButton).toHaveLength(1);
		expect(rowButton[0]).toHaveTextContent('Connection name');
	});
	it('should reset the badge rows when the filter is reset', () => {
		// Given
		const props = {
			initialFilterValue: 'name',
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);
		expect(getRowButtons()).toHaveLength(2);
		// Then
		fireEvent.mouseDown(screen.getByLabelText('Remove filter'));
		expect(getRowButtons()).toHaveLength(3);
	});
	it('should return the badge definition when click on a row', () => {
		// Given
		const onClick = jest.fn();
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick,
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		getRowButtons(wrapper).first().simulate('click');
		// Then
		expect(onClick).toHaveBeenNthCalledWith(1, onClick.mock.calls[0][0], badgesDefinitions[1]);
	});
	it('should render the category row', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		// Then
		expect(wrapper.find('.tc-add-facet-popover-row-button')).toHaveLength(3);
		expect(wrapper.find('.tc-add-facet-popover-row-button-category')).toHaveLength(1);
	});
	it('should display the hidden category screen when click on a category row', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		const wrapper = mount(<AddFacetPopover {...props} />);
		getRowButtons(wrapper).at(1).simulate('click'); // click on "Custom attributes"
		// Then
		expect(wrapper.find('.tc-add-facet-popover-header-category')).toHaveLength(1);
	});
	it('should render an empty state when filter return no result', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);
		// Then
		fireEvent.change(document.querySelector('input'), { target: { value: 'aaaaaaaaaa' } });
		expect(document.querySelectorAll('button.tc-add-facet-popover-row-button')).toHaveLength(0);
		expect(
			document.querySelectorAll('span.tc-add-facet-popover-filter-empty')[0],
		).toHaveTextContent('No result found');
	});
	it('should render a disabled row if badgePerFacet is exceeded', () => {
		// Given
		const props = {
			badges: [
				{
					properties: {
						initialOpenedOperator: true,
						initialOpenedValue: false,
						attribute: 'connection.name',
						label: 'Connection name',
						operator: {},
						operators: [],
						type: 'checkbox',
						values: [{ id: 'amazon_s3', label: 'Amazon S3' }],
					},
					metadata: {
						badgePerFacet: '1',
						entitiesPerBadge: '1',
						operators: ['in'],
					},
				},
			],
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);
		// Then
		expect(document.querySelectorAll('button.tc-add-facet-popover-row-button')).toHaveLength(2);
		expect(document.querySelectorAll('div.tc-add-facet-popover-row-disabled')).toHaveLength(1);
	});
	it('should not render an empty label badge', () => {
		// Given
		const props = {
			badges: [
				{
					properties: {
						initialOpenedOperator: true,
						initialOpenedValue: false,
						attribute: 'connection.name',
						label: '',
						operator: {},
						operators: [],
						type: 'checkbox',
						values: [{ id: 'amazon_s3', label: 'Amazon S3' }],
					},
					metadata: {
						badgePerFacet: '1',
						entitiesPerBadge: '1',
						operators: ['in'],
					},
				},
			],
			badgesDefinitions,
			id: 'my-id',
			onClick: jest.fn(),
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);
		// Then
		expect(document.querySelectorAll('button[aria-label=""]')).toHaveLength(0);
	});
	it('should sort by label if no comparator provided', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my id',
			onClick: jest.fn(),
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);

		// Then
		const rowButtons = getRowButtons();
		expect(rowButtons[0]).toHaveTextContent('Connection name');
		expect(rowButtons[1]).toHaveTextContent('Custom attributes');
		expect(rowButtons[2]).toHaveTextContent('Name');
	});
	it('should not sort if null is provided as comparator', () => {
		// Given
		const props = {
			badges,
			badgesDefinitions,
			id: 'my id',
			onClick: jest.fn(),
			badgesDefinitionsSort: null,
			t,
		};
		// When
		render(<AddFacetPopover {...props} />);

		// Then
		const rowButtons = getRowButtons();
		expect(rowButtons[0]).toHaveTextContent('Name');
		expect(rowButtons[1]).toHaveTextContent('Connection name');
		expect(rowButtons[2]).toHaveTextContent('Custom attributes');
	});
});
