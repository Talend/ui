import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import keycode from 'keycode';
import ListView from './ListView.component';

jest.useFakeTimers();

function filter(wrapper, searchCriteria) {
	wrapper.find('.tc-listview-header button').at(0).simulate('click');
	const event = { target: { value: searchCriteria } };
	wrapper.find('.tc-listview-header input').at(0).simulate('change', event);
	jest.runAllTimers();
}

describe('ListView field', () => {
	let props;
	const schema = {
		description: 'This is the ListView field',
		disabled: false,
		emptyLabel: 'No element',
		noResultLabel: 'No element matching your filter',
		placeholder: 'Search filter',
		required: true,
		title: 'Countries',
		titleMap: [
			{ name: 'Afghanistan', value: 'country1' },
			{ name: 'Albania', value: 'country2' },
			{ name: 'Algeria', value: 'country3' },
			{ name: 'Andorra', value: 'country4' },
		],
	};
	const alternativeSchema = {
		description: 'This is the ListView field',
		disabled: true,
		emptyLabel: 'Zero items !',
		noResultLabel: 'Zero item for your filter !',
		placeholder: 'Search this',
		required: true,
		title: 'Some countries',
		titleMap: [
			{ name: 'Afghanistan', value: 'country1' },
			{ name: 'Albania', value: 'country2' },
			{ name: 'Algeria', value: 'country3' },
			{ name: 'Andorra', value: 'country4' },
			{ name: 'Angola', value: 'country5' },
			{ name: 'Anguilla', value: 'country6' },
		],
	};
	const noItemsSchema = {
		description: 'This is the ListView field',
		disabled: false,
		emptyLabel: 'No element',
		noResultLabel: 'No element matching your filter',
		placeholder: 'Search filter',
		required: true,
		title: 'Countries',
		titleMap: [],
	};

	beforeEach(() => {
		props = {
			id: 'my-list-view',
			isValid: true,
			errorMessage: 'This is wrong',
			onChange: jest.fn(),
			onFinish: jest.fn(),
			schema,
			value: ['country2', 'country3'],
		};
	});

	describe('render', () => {
		it('should render ListView', () => {
			// when
			const wrapper = shallow(<ListView {...props} />);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});

		it('should render no items message', () => {
			// when
			const wrapper = mount(<ListView {...props} schema={noItemsSchema} />);

			// then
			expect(wrapper.find('.tc-listview').at(0).node).toMatchSnapshot();
		});
	});

	describe('componentWillReceiveProps', () => {
		it('should update items on props.value change', () => {
			// given
			const node = document.createElement('div');
			// eslint-disable-next-line react/no-render-return-value
			const instance = ReactDOM.render(<ListView {...props} />, node);
			expect(instance.state).toMatchSnapshot();

			const allValues = props.schema.titleMap.map(option => option.value);

			// when : trigger a props update
			ReactDOM.render(<ListView {...props} value={allValues} />, node);

			// then
			expect(instance.state).toMatchSnapshot();
		});

		it('should update items on props.schema change', () => {
			// given
			const node = document.createElement('div');
			// eslint-disable-next-line react/no-render-return-value
			const instance = ReactDOM.render(<ListView {...props} />, node);
			expect(instance.state).toMatchSnapshot();

			const allValues = alternativeSchema.titleMap.map(option => option.value);

			// when : trigger a props update
			ReactDOM.render(<ListView
				{...props}
				schema={alternativeSchema}
				value={allValues}
			/>, node);

			// then
			expect(instance.state).toMatchSnapshot();
		});
	});

	describe('filter', () => {
		it('should switch to input mode on search button click', () => {
			// given
			const wrapper = mount(<ListView {...props} />);
			const initialHeader = wrapper.find('.tc-listview-header').at(0);
			expect(initialHeader.node).toMatchSnapshot();

			// when
			initialHeader.find('button').at(0).simulate('click');

			// then
			expect(wrapper.find('.tc-listview-header').at(0).node).toMatchSnapshot();
		});

		it('should filter items on input change', () => {
			// given
			const wrapper = mount(<ListView {...props} />);

			// when
			filter(wrapper, 'ia');

			// then
			expect(wrapper.find('.tc-listview-items').at(0).node).toMatchSnapshot();
		});

		it('should show no result message', () => {
			// given
			const wrapper = mount(<ListView {...props} />);

			// when
			filter(wrapper, 'lol');

			// then
			expect(wrapper.find('.tc-listview').at(0).node).toMatchSnapshot();
		});

		it('should switch back to default mode on abort button click', () => {
			// given
			const wrapper = mount(<ListView {...props} />);
			filter(wrapper, 'ia');

			expect(wrapper.state()).toMatchSnapshot();

			// when
			wrapper.find('.tc-listview-header button').at(0).simulate('click');

			// then
			expect(wrapper.state()).toMatchSnapshot();
		});

		it('should switch back to default mode on ESC keydown', () => {
			// given
			const wrapper = mount(<ListView {...props} />);
			filter(wrapper, 'ia');

			expect(wrapper.state()).toMatchSnapshot();

			// when
			wrapper.find('.tc-listview-header input').at(0).simulate('keydown', { keyCode: keycode('escape') });

			// then
			expect(wrapper.state()).toMatchSnapshot();
		});
	});

	describe('list change', () => {
		it('should toggle item', () => {
			// given
			const wrapper = mount(<ListView {...props} />);
			expect(props.onChange).not.toBeCalled();
			expect(props.onFinish).not.toBeCalled();

			// when
			wrapper.find('#checkbox-my-list-view-1-item').simulate('change', { target: { checked: true } });

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country2', 'country3'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should select all item', () => {
			// given
			const wrapper = mount(<ListView {...props} />);
			expect(props.onChange).not.toBeCalled();
			expect(props.onFinish).not.toBeCalled();

			// when
			wrapper.find('#my-list-view-toggle-all').simulate('change', { target: { checked: true } });

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country2', 'country3', 'country4'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should deselect all item', () => {
			// given
			const allValues = props.schema.titleMap.map(option => option.value);
			const wrapper = mount(<ListView {...props} value={allValues} />);
			expect(props.onChange).not.toBeCalled();
			expect(props.onFinish).not.toBeCalled();

			// when
			wrapper.find('#my-list-view-toggle-all').simulate('change', { target: { checked: false } });

			// then
			const payload = {
				schema: props.schema,
				value: undefined,
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should select all filtered item', () => {
			// given
			const wrapper = mount(<ListView {...props} />);
			filter(wrapper, 'g');

			// when
			wrapper.find('#my-list-view-toggle-all').simulate('change', { target: { checked: true } });

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country2', 'country3'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should deselect all filtered item', () => {
			// given
			const allValues = props.schema.titleMap.map(option => option.value);
			const wrapper = mount(<ListView {...props} value={allValues} />);
			filter(wrapper, 'ia');

			// when
			wrapper.find('#my-list-view-toggle-all').simulate('change', { target: { checked: false } });

			// then
			const payload = {
				schema: props.schema,
				value: ['country1', 'country4'],
			};
			expect(props.onChange).toBeCalledWith(expect.anything(), payload);
			expect(props.onFinish).toBeCalledWith(expect.anything(), payload);
		});
	});
});
