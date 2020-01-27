import React from 'react';
import { shallow } from 'enzyme';
import Skeleton from '@talend/react-components/lib/Skeleton';
import FormSkeleton from './FormSkeleton';

describe('FormSkeleton', () => {
	it('should render skeleton', () => {
		const wrapper = shallow(<FormSkeleton />);
		expect(wrapper.find(Skeleton).length).toBe(10);
	});

	it('should render skeleton  without its buttons', () => {
		const wrapper = shallow(<FormSkeleton displayMode="text" />);
		expect(wrapper.find(Skeleton).length).toBe(8);
	});
});
