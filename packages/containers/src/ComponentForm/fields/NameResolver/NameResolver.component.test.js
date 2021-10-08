import React from 'react';
import { shallow } from 'enzyme';
import withNameResolver from './NameResolver.component';

const NameResolverDumbComponent = withNameResolver(props => <div {...props} />);

describe('Name resolver component', () => {
	it('should resolve unknown value name from properties', () => {
		// given
		const properties = { my: { path: { myValue: 'lol', $myValue_name: 'lol name' } } };
		const schema = { key: ['my', 'path', 'myValue'] };

		const wrapper = shallow(<NameResolverDumbComponent properties={properties} schema={schema} />);
		const resolveName = wrapper.prop('resolveName');

		// when
		const name = resolveName('new lol');

		// then
		expect(name).toBe('lol name');
	});

	it('should return value as name if no name is provided in properties', () => {
		// given
		const properties = { my: { path: { myValue: 'lol' } } };
		const schema = { key: ['my', 'path', 'myValue'] };

		const wrapper = shallow(<NameResolverDumbComponent properties={properties} schema={schema} />);
		const resolveName = wrapper.prop('resolveName');

		// when
		const name = resolveName('new lol');

		// then
		expect(name).toBe('new lol');
	});
});
