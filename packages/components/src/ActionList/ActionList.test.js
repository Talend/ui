import React from 'react';
import { Button } from '@talend/react-bootstrap';
import { mount } from 'enzyme';
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
		const actionList = <ActionList actions={actions} />;
		const wrapper = mount(actionList);
		wrapper
			.find(Button)
			.at(2)
			.simulate('click');

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
		const actionList = <ActionList id="test" actions={actions} />;
		const wrapper = mount(actionList);

		expect(wrapper.find('button#test-nav-preparation-custom-id').text()).toEqual('Preparations');
		expect(wrapper.find('button#test-nav-datasets-custom-id').text()).toEqual('Datasets');
		expect(wrapper.find('button#test-nav-favs-custom-id').text()).toEqual('Favorites');
	});

	it('should work even if there is no id, label, or action id', () => {
		const actions = [{}, {}, {}];
		const actionList = <ActionList actions={actions} />;

		expect(() => {
			mount(actionList);
		}).not.toThrow();
	});
});
