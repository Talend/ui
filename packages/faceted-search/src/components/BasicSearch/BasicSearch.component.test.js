import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { fireEvent, render, screen } from '@testing-library/react';
import { BasicSearch } from './BasicSearch.component';
import { FacetedManager } from '../FacetedManager';
import { USAGE_TRACKING_TAGS } from '../../constants';

describe('BasicSearch', () => {
	const badgeText = {
		properties: {
			attribute: 'name',
			initialOperatorOpened: false,
			initialValueOpened: false,
			label: 'Name',
			operator: { label: 'Equals', name: '=', iconName: 'equal' },
			operators: [
				{ label: 'Equals', name: '=', iconName: 'equal' },
				{ label: 'Contains', name: 'contains', iconName: 'contains' },
			],
			type: 'text',
			value: 'hello',
		},
		metadata: {
			badgeId: 'name-7bc9bd07-3b46-4b8c-a406-a08b6263de5b',
			badgePerFacet: 'N',
			isInCreation: true,
			entitiesPerBadge: '1',
			operators: ['contains', '='],
		},
	};
	const badgesFaceted = {
		badges: [{ ...badgeText }],
	};
	const badgeDefinitionName = {
		properties: {
			attribute: 'name',
			initialOperatorOpened: true,
			initialValueOpened: false,
			label: 'Name',
			operator: {},
			operators: [
				{ label: 'Equals', name: '=', iconName: 'equal' },
				{ label: 'Contains', name: 'contains', iconName: 'contains' },
			],
			type: 'text',
		},
		metadata: {
			badgePerFacet: 'N',
			entitiesPerBadge: '1',
			operators: ['contains', '='],
			isAvailableForQuickSearch: true,
		},
	};

	const badgesDefinitions = [badgeDefinitionName];

	const badgesDefinitionsWithQuicksearch = [
		{
			...badgeDefinitionName,
			metadata: {
				...badgeDefinitionName.metadata,
				isAvailableForQuickSearch: true,
			},
		},
	];

	it('should render the default html output with no badges', () => {
		// Given
		const props = {
			badgesDefinitions,
			badgesFaceted,
			onSubmit: jest.fn(),
		};
		// When
		const { container } = render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render the default html output with initial badges', () => {
		// Given
		const props = {
			badgesDefinitions,
			initialBadges: [
				{
					attribute: 'name',
					operator: '=',
					value: 'hello',
				},
			],
			onSubmit: jest.fn(),
		};
		// When
		render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		// Then
		expect(screen.getByLabelText('Name')).toBeInTheDocument();
		expect(screen.getByText('hello')).toBeInTheDocument();
	});

	it('should filter facets available in quick search', () => {
		// Given
		const props = {
			badgesDefinitions: badgesDefinitionsWithQuicksearch,
			badgesFaceted,
			onSubmit: jest.fn(),
		};
		// When
		render(
			<FacetedManager id="manager-id">
				<BasicSearch
					{...props}
					quickSearchFacetsFilter={(term, facets) =>
						facets.filter(facet => facet.properties.label === term)
					}
				/>
			</FacetedManager>,
		);
		// Then
		fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Name' } });

		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.getAllByRole('option')).toHaveLength(1);

		fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'NotName' } });
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryAllByRole('option')).toHaveLength(0);
	});

	it('should display quick search faced depending on badge length configuration', () => {
		// Given
		const props = {
			badgesDefinitions: badgesDefinitionsWithQuicksearch.map(
				badgesDefinitionsWithQuicksearchItem => ({
					...badgesDefinitionsWithQuicksearchItem,
					metadata: { ...badgesDefinitionsWithQuicksearchItem.metadata, minLength: 3 },
				}),
			),
			badgesFaceted,
			onSubmit: jest.fn(),
		};
		render(
			<FacetedManager id="manager-id">
				<BasicSearch
					{...props}
					quickSearchFacetsFilter={(term, facets) =>
						facets.filter(facet => facet.properties.label === term)
					}
				/>
			</FacetedManager>,
		);
		// When searching with less then 3 chars
		fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Na' } });

		// Then it won't display any facet
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryAllByRole('option')).toHaveLength(0);

		// When searching with more then 3 chars
		fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Name' } });

		// Then it will display name facet
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.getAllByRole('option')).toHaveLength(1);
	});

	it('should not trigger onSubmit when badge definition has not changed', () => {
		// given
		const onSubmit = jest.fn();
		const props = {
			badgesDefinitions,
			onSubmit,
		};
		// when
		const { rerender } = render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		expect(onSubmit).not.toHaveBeenCalled();

		rerender(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		// then
		expect(onSubmit).not.toHaveBeenCalled();
	});
	it('should not trigger onSubmit when a badge is in creation', () => {
		// given
		const onSubmit = jest.fn();
		const props = {
			badgesDefinitions,
			onSubmit,
		};
		// when
		const { rerender } = render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		expect(onSubmit).not.toHaveBeenCalled();

		rerender(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} badgesFaceted={badgesFaceted} />
			</FacetedManager>,
		);

		expect(onSubmit).not.toHaveBeenCalled();
	});

	it('should trigger onSubmit when no badge is in creation and badge definition has changed', () => {
		// given
		const onSubmit = jest.fn();
		const props = {
			badgesDefinitions,
			onSubmit,
		};
		const badgesFacetedNotInCreation = {
			badges: [
				{
					...badgeText,
					metadata: {
						...badgeText.metadata,
						isInCreation: false,
					},
				},
			],
		};
		// when
		const { rerender } = render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);
		expect(onSubmit).not.toHaveBeenCalled();

		rerender(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} badgesFaceted={badgesFacetedNotInCreation} />
			</FacetedManager>,
		);

		// then
		expect(onSubmit).toHaveBeenCalled();
		expect(onSubmit.mock.calls.length).toBe(1);
		expect(onSubmit.mock.calls[0][0]).toEqual({});
		expect(onSubmit.mock.calls[0][1]).toEqual(badgesFacetedNotInCreation.badges);
	});

	it('should not show add filter button when no badge definitions provided', () => {
		// Given
		const props = {
			badgesDefinitions: [],
			badgesFaceted,
			onSubmit: jest.fn(),
		};
		// When
		render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);

		// Then
		expect(
			document.querySelectorAll(`button[data-feature="${USAGE_TRACKING_TAGS.BASIC_ADD}"]`).length,
		).toBe(0);
		expect(
			document.querySelectorAll(`button[data-feature="${USAGE_TRACKING_TAGS.BASIC_CLEAR}"]`).length,
		).toBe(1);
	});

	it('should not show remove all buttons when no badge can be removed', () => {
		// Given
		const props = {
			badgesDefinitions,
			badgesFaceted: set(cloneDeep(badgesFaceted), 'badges[0].properties.removable', false),
			onSubmit: jest.fn(),
		};
		// When
		render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);

		// Then
		expect(
			document.querySelectorAll(`button[data-feature="${USAGE_TRACKING_TAGS.BASIC_ADD}"]`).length,
		).toBe(1);
		expect(
			document.querySelectorAll(`button[data-feature="${USAGE_TRACKING_TAGS.BASIC_CLEAR}"]`).length,
		).toBe(0);
	});

	it('should remove all badges on clear button click', () => {
		// Given
		const props = {
			badgesDefinitions,
			badgesFaceted,
			onSubmit: jest.fn(),
		};
		// When
		render(
			<FacetedManager id="manager-id">
				<BasicSearch {...props} />
			</FacetedManager>,
		);

		// Then
		expect(document.querySelectorAll('.tc-badge').length).toBe(1);
		fireEvent.click(
			document.querySelector(`button[data-feature="${USAGE_TRACKING_TAGS.BASIC_CLEAR}"]`),
		);
		expect(document.querySelectorAll('.tc-badge').length).toBe(0);
	});
});
