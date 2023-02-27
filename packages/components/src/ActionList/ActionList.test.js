import React from 'react';
import { mount } from 'enzyme';
import { render, screen, configure } from '@testing-library/react';
import ActionList from './ActionList.component';

describe('ActionList', () => {
	it('should trigger action callback on action click', () => {
		// given
		const onPreparationsClick = jest.fn();
		const onDatasetsClick = jest.fn();
		const onFavoritesClick = jest.fn();
		const actions = [
			{ label: 'Preparations', icon: 'fa fa-asterisk', onClick: onPreparationsClick },
			{ label: 'Datasets', icon: 'fa fa-file-excel-o', onClick: onDatasetsClick },
			{ label: 'Favorites', icon: 'fa fa-star', onClick: onFavoritesClick },
		];

		// when
		render(<ActionList actions={actions} />);
		screen.getByText('Favorites').click();

		// then
		expect(onPreparationsClick).not.toBeCalled();
		expect(onDatasetsClick).not.toBeCalled();
		expect(onFavoritesClick).toBeCalled();
	});

	it('should accept custom action ids', () => {
		const actions = [
			{ label: 'Preparations', id: 'preparation-custom-id' },
			{ label: 'Datasets', id: 'datasets-custom-id' },
			{ label: 'Favorites', id: 'favs-custom-id' },
		];
		render(<ActionList id="test" actions={actions} />);
		expect(screen.getByText('Preparations').parentElement).toHaveAttribute(
			'id',
			'test-nav-preparation-custom-id',
		);
		expect(screen.getByText('Datasets').parentElement.id).toBe('test-nav-datasets-custom-id');
		expect(screen.getByText('Favorites').parentElement.id).toBe('test-nav-favs-custom-id');
	});

	it('should work even if there is no id, label, or action id', () => {
		const actions = [{}, {}, {}];

		expect(() => {
			render(<ActionList actions={actions} />);
		}).not.toThrow();
	});
});
