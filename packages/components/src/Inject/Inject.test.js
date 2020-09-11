import React from 'react';
import { shallow } from 'enzyme';
import { Action } from '../index';

import Inject from './Inject.component';

const error = { message: 'MyError' };

describe('Inject', () => {
	it('should render', () => {
		const wrapper = shallow(<Inject />);
		expect(wrapper.getElement()).toEqual(null);
	});
	it('should render an Action component', () => {
		const getComponent = jest.fn(() => Action);
		const props = {
			getComponent,
			component: 'Action',
			label: 'MyLabel',
			icon: 'MyIcon',
		};
		const wrapper = shallow(<Inject {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render NotFoundComponent', () => {
		const getComponent = jest.fn(() => {
			throw error;
		});
		const props = {
			getComponent,
			component: 'Action',
		};
		const wrapper = shallow(<Inject {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Inject.map', () => {
	it('should render inject actions', () => {
		const getComponent = jest.fn(() => Action);
		const array = [
			{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
			{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
		];
		expect(Inject.map(getComponent, array)).toEqual([
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction1"
				label="LabelAction1"
				key={0}
			/>,
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction2"
				label="LabelAction2"
				key={1}
			/>,
		]);
	});
	it('should return []', () => {
		const getComponent = jest.fn(() => Action);
		expect(Inject.map(getComponent, [])).toEqual([]);
	});
});

describe('Inject.all', () => {
	it('should return a function which return an array of inject actions', () => {
		const getComponent = jest.fn();
		const components = {
			col1: [
				{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
				{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
			],
			col2: { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
		};
		const inject = Inject.all(getComponent, components);
		expect(inject('col1')).toEqual([
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction1"
				label="LabelAction1"
				key={0}
			/>,
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction2"
				label="LabelAction2"
				key={1}
			/>,
		]);
	});
	it('should return a function which return an array of custom inject', () => {
		const getComponent = jest.fn();
		const components = {
			col1: [
				{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
				{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
			],
			col2: { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
		};
		const CustomInject = () => <CustomInject />;
		const ret = Inject.all(getComponent, components, CustomInject);
		expect(ret('col1')).toEqual([
			<CustomInject
				component="Action"
				getComponent={getComponent}
				icon="IconAction1"
				label="LabelAction1"
				key={0}
			/>,
			<CustomInject
				component="Action"
				getComponent={getComponent}
				icon="IconAction2"
				label="LabelAction2"
				key={1}
			/>,
		]);
	});
	it('should return a function which return an inject action', () => {
		const getComponent = jest.fn();
		const components = {
			col1: [
				{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
				{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
			],
			col2: { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
		};
		expect(Inject.all(getComponent, components)('col2', { customProps: 'customProps' })).toEqual(
			<Inject
				component="Action"
				getComponent={getComponent}
				icon="IconAction3"
				label="LabelAction3"
				customProps="customProps"
			/>,
		);
	});
	it('should return a function which return null (bad key)', () => {
		const getComponent = jest.fn();
		const components = {
			col1: [
				{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
				{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
			],
			col2: { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
		};
		expect(Inject.all(getComponent, components)('col4')).toEqual(null);
	});
	it('should return a function which return null (components null)', () => {
		const getComponent = jest.fn();
		expect(Inject.all(getComponent, null)()).toEqual(null);
	});
	it('should return a function which return null (getComponent null)', () => {
		const components = {
			col1: [
				{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
				{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
			],
			col2: { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
		};
		expect(Inject.all(null, components)()).toEqual(null);
	});
	it('should return a function which return a react component', () => {
		const myComponent = <button>whatever</button>;
		const components = {
			slotX: myComponent,
		};
		const injections = Inject.all(undefined, components);
		expect(injections('slotX')).toBe(myComponent);
	});
});

describe('Inject.get', () => {
	it('should return Component', () => {
		expect(Inject.get(null, null, Action)).toEqual(Action);
	});
	it('should return an Action', () => {
		const getComponent = jest.fn(() => Action);
		expect(Inject.get(getComponent, null, Action)).toEqual(Action);
	});
	it('should return Component (catch error)', () => {
		const getComponent = jest.fn(() => {
			throw error;
		});
		expect(Inject.get(getComponent, null, Action)).toEqual(Action);
	});
	it('should return null', () => {
		expect(Inject.get(null, null, null)).toEqual(null);
	});
});

describe('Inject.getAll', () => {
	it('should return Action', () => {
		const getComponent = jest.fn(() => Action);
		const config = {
			Action,
		};
		expect(Inject.getAll(getComponent, config)).toEqual({ Action });
	});
});

describe('Inject.getReactElement', () => {
	it('should support element as string', () => {
		const getComponent = jest.fn();
		const data = 'what';
		expect(Inject.getReactElement(getComponent, data)).toEqual(
			<Inject getComponent={getComponent} component="what" />,
		);
	});
	it('should support element as object', () => {
		const getComponent = jest.fn();
		const data = { component: 'what', extra: true };
		expect(Inject.getReactElement(getComponent, data)).toEqual(
			<Inject getComponent={getComponent} component="what" extra />,
		);
	});
	it('should support element as Array', () => {
		const getComponent = jest.fn();
		const data = [{ component: 'what', componentId: 'me', extra: true }, 'Foo'];
		expect(Inject.getReactElement(getComponent, data)).toEqual([
			<Inject getComponent={getComponent} component="what" componentId="me" extra key="what#me" />,
			<Inject getComponent={getComponent} component="Foo" key="Foo#default" />,
		]);
	});
	it('should return undefined if data is undefined', () => {
		expect(Inject.getReactElement()).toBe();
	});
	it('should return null if data is null', () => {
		expect(Inject.getReactElement(jest.fn(), null)).toBe(null);
	});
	it('should return data if it s not supported type', () => {
		expect(Inject.getReactElement(jest.fn(), false)).toBe(false);
		expect(Inject.getReactElement(jest.fn(), true)).toBe(true);
	});
	it('should support element as valid react element', () => {
		const getComponent = jest.fn();
		const data = <p>foo</p>;
		expect(Inject.getReactElement(getComponent, data)).toEqual(data);
	});
});

describe('NotFoundComponent', () => {
	it('should render', () => {
		const wrapper = shallow(<Inject.NotFoundComponent error="MyError" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
