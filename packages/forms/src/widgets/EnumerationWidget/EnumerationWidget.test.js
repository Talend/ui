import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import EnumerationWidget from './EnumerationWidget';

jest.mock(
	'../../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props =>
		/* eslint-disable */
		<div id="autoSizer">{ props.children({ height: 30, width: 30 }) }</div>
	/* eslint-enable */
);

describe('EnumerationWidget', () => {
	it('should be in default mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in default mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{
					required: true,
				}}
			/>);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in add mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);

		// when
		wrapper.find('.tc-enumeration-header .btn-link').last().simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in search mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget />);

		// when
		wrapper.find('.tc-enumeration-header .btn-link').first().simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should be in edit mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(0)
			.simulate('click');

		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should delete an item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(1)
			.simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should select an item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});


	it('should select multiple  items', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
					{ id: '112', values: ['titi2', 'tata2'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('click');
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('click', { ctrlKey: true });

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('delete all', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
			/>
		);
		wrapper.find('.tc-enumeration-item-label').at(0).simulate('click');
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('click', { ctrlKey: true });

		// when click on trash icon
		wrapper.find('.tc-enumeration-header').find('.btn-link').simulate('click');

		// then
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should delete an item with callHandler', () => {
		const registry = {
			formContext: {
				handleAction: jest.fn(),
			},
		};

		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				registry={registry}
				formData={[
					{ id: '11212242', values: ['titi', 'tata'] },
				]}
			/>
		);

		// when
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(1)
			.simulate('click');

		// then
		expect(registry.formContext.handleAction).toBeCalled();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should deselect edit mode when select other item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				formData={[
					{ id: '111', values: ['titi', 'tata'] },
					{ id: '112', values: ['toto', 'tutu'] },
				]}
			/>);

		// edit item
		wrapper.find('.tc-enumeration-item-actions').find('.btn-link').at(0)
			.simulate('click');

		// when select another item
		wrapper.find('.tc-enumeration-item-label').at(1).simulate('click');

		// should reset all items to default mode
		expect(wrapper.find('.tc-enumeration-item input').length).toBe(0);
		expect(wrapper.find('.tc-enumeration-item .btn-default').length).toBe(2);
	});

	describe('upload file', () => {
		it('should add a upload icon', () => {
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
				/>);
			expect(toJson(wrapper)).toMatchSnapshot();
		});

		it('should simulate click on the input', () => {
			// given
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
				/>);
			wrapper.instance().inputFile.click = jest.fn();
			spyOn(document.activeElement, 'blur').and.callThrough();

			// when
			wrapper.find('.tc-enumeration-header').find('.btn-link').at(1).simulate('click');

			// then
			expect(wrapper.instance().inputFile.click).toBeCalled();
			expect(document.activeElement.blur).toBeCalled();
		});

		it('should trigger a event when the user clicks on the upload action'
				+ ', shows a loading and return to initial state when we call the success callback', () => {
			// given
			let successUploadHandler;
			const registry = {
				formContext: {
					handleAction: (component, actionName, value, successHandler) => {
						successUploadHandler = successHandler;
					},
				},
			};

			const spy = spyOn(registry.formContext, 'handleAction').and.callThrough();

			const wrapper = mount(
				<EnumerationWidget
					id="enumeration"
					schema={{
						allowImport: true,
					}}
					registry={registry}
					formData={[
						{ id: '111', values: ['titi', 'tata'] },
						{ id: '112', values: ['titi2', 'tata2'] },
					]}
				/>);

			const event = {
				target: {
					files: ['file'],
				},
			};

			wrapper.instance().resetInputFile = jest.fn();

			// when
			wrapper.instance().importFile(event);


			// then
			expect(wrapper.instance().resetInputFile).toBeCalled();
			expect(spy).toBeCalledWith(
				'enumeration',
				'ENUMERATION_IMPORT_FILE_ACTION',
				'file',
				jasmine.any(Function),
				jasmine.any(Function)
			);

			expect(toJson(wrapper.update())).toMatchSnapshot();

			successUploadHandler();
			expect(toJson(wrapper.update())).toMatchSnapshot();
		});
	});

	describe('utils method', () => {
		it('should split with using coma separator and trim the sub strings', () => {
			// given
			const enumerationWidget = new EnumerationWidget({});
			// when
			const resultArray = enumerationWidget.parseStringValueToArray('toto ,  to , tata ');
			// then
			expect(resultArray).toEqual(['toto', 'to', 'tata']);
		});
	});
});
