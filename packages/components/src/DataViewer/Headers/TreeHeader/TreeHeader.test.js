import React from 'react';
import { shallow } from 'enzyme';
import Component from './TreeHeader.component';

jest.mock('react-i18next', () => {
	// eslint-disable-next-line global-require
	const mockTranslations = require('../../../../test/i18nMock').default;

	return mockTranslations();
});

describe('TreeHeader', () => {
	it('should render a simple tree header', () => {
		const wrapper = shallow(<Component title="myTitle" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render with the collapse button', () => {
		const onClickCollapseAll = jest.fn();
		const wrapper = shallow(<Component title="myTitle" onClickCollapseAll={onClickCollapseAll} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should trigger click on the collapse button', () => {
		const onClickCollapseAll = jest.fn();
		const wrapper = shallow(<Component title="myTitle" onClickCollapseAll={onClickCollapseAll} />);
		wrapper.find('Action').simulate('click');
		expect(onClickCollapseAll).toHaveBeenCalled();
	});
	it('should render with the expand button', () => {
		const onClickExpandAll = jest.fn();
		const wrapper = shallow(<Component title="myTitle" onClickExpandAll={onClickExpandAll} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should trigger click on the expand button', () => {
		const onClickExpandAll = jest.fn();
		const wrapper = shallow(<Component title="myTitle" onClickExpandAll={onClickExpandAll} />);
		wrapper.find('Action').simulate('click');
		expect(onClickExpandAll).toHaveBeenCalled();
	});
	it('should render other actions', () => {
		const otherActions = () => <div>MyOtherActions</div>;
		const wrapper = shallow(<Component title="myTitle" otherActions={otherActions} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
