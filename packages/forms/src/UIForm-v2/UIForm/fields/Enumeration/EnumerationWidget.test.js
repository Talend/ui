import React from 'react';
import { mount } from 'enzyme';
import { Button } from 'react-bootstrap';
import toJsonWithoutI18n from '../../../../../__mocks__/props-without-i18n';
import TranslatedEnumeration, {
	EnumerationForm as EnumerationWidget,
	enumerationStates,
} from './EnumerationWidget';

describe('EnumerationWidget', () => {
	it('should wrapped in Translate component', () => {
		const wrapper = mount(<TranslatedEnumeration schema={{}} />);
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should be in default mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget schema={{}} />);
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
	});

	it('should be in default mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{
					required: true,
				}}
			/>,
		);
		expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
		expect(
			wrapper
				.find('.tc-enumeration-header')
				.at(0)
				.find(Button).length,
		).toBe(2);
	});

	it('should be in disabled mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{
					disabled: true,
				}}
				value={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
			/>,
		);
		expect(
			wrapper
				.find('.tc-enumeration-header')
				.at(0)
				.find(Button).length,
		).toBe(1);
		expect(
			wrapper
				.find('.tc-enumeration-item-actions')
				.at(0)
				.find(Button).length,
		).toBe(0);
	});

	it('should be in add mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget schema={{}} />);

		// when
		wrapper
			.find('.tc-enumeration-header .btn-link')
			.last()
			.simulate('click');

		// then
		expect(wrapper.find('.tc-enumeration-header #tc-enumeration_add').length).toBe(1);
		expect(wrapper.find('.tc-enumeration-header button').length).toBe(1);
	});

	it('should be in search mode', () => {
		// given
		const wrapper = mount(<EnumerationWidget schema={{}} />);

		// when
		wrapper
			.find('.tc-enumeration-header .btn-link')
			.first()
			.simulate('click');

		// then
		expect(wrapper.find('.tc-enumeration-header #tc-enumeration_search').length).toBe(1);
		expect(wrapper.find('.tc-enumeration-header button').length).toBe(1);
	});

	it('should be in edit mode', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={{}}
				value={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		wrapper
			.find('.tc-enumeration-item-actions')
			.find('.btn-link')
			.at(0)
			.simulate('click');

		expect(
			wrapper
				.find('.tc-enumeration-item')
				.at(0)
				.find('input').length,
		).toBe(1);
		expect(
			wrapper
				.find('.tc-enumeration-item-actions')
				.at(0)
				.find(Button).length,
		).toBe(2);
	});

	it('should trigger rename action', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve({}));
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				properties={{
					connectedMode: true,
				}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				value={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		wrapper
			.find('.tc-enumeration-item-actions')
			.find('.btn-link')
			.at(0)
			.simulate('click');

		wrapper
			.find('.tc-enumeration-item input')
			.at(0)
			.instance().value = 'foo';

		wrapper
			.find('.tc-enumeration-item-actions')
			.find('.btn-link')
			.at(0)
			.simulate('click');
		// then
		expect(wrapper.find('.tc-enumeration-item').length).toBe(1);
		expect(onTrigger.mock.calls[0][1]).toEqual({
			schema: {},
			trigger: {
				action: 'ENUMERATION_RENAME_ACTION',
				id: '111',
				index: 0,
				value: ['foo'],
			},
		});
	});

	it('should trigger search action', () => {
		// given
		jest.useFakeTimers();
		const onTrigger = jest.fn(() => Promise.resolve([]));
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				properties={{
					connectedMode: true,
				}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				value={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		// add mode
		wrapper
			.find('.tc-enumeration-header')
			.find('.btn-link')
			.at(0)
			.simulate('click');

		wrapper
			.find('.tc-enumeration-header input')
			.at(0)
			.simulate('change', { target: { value: 'foo' } });

		jest.runAllTimers();

		// then
		expect(onTrigger.mock.calls[0][1]).toEqual({
			schema: {},
			trigger: {
				action: 'ENUMERATION_SEARCH_ACTION',
				value: 'foo',
			},
		});
	});

	it('should trigger add action', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve({}));
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				properties={{
					connectedMode: true,
				}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				value={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		// add mode
		wrapper
			.find('.tc-enumeration-header')
			.find('.btn-link')
			.at(1)
			.simulate('click');

		wrapper
			.find('.tc-enumeration-header input')
			.at(0)
			.simulate('change', { target: { value: 'foo' } });

		// trigger add action
		wrapper
			.find('.tc-enumeration-header')
			.find('.btn-link')
			.at(1)
			.simulate('click');

		// then
		expect(onTrigger.mock.calls[0][1]).toEqual({
			schema: {},
			trigger: {
				action: 'ENUMERATION_ADD_ACTION',
				value: ['foo'],
			},
		});
	});

	it('should delete an item', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				onChange={onChange}
				onFinish={jest.fn()}
				value={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);
		expect(wrapper.find('.tc-enumeration-item').length).toBe(1);

		// when
		wrapper
			.find('.tc-enumeration-item-actions')
			.find('.btn-link')
			.at(1)
			.simulate('click');

		// then
		expect(onChange.mock.calls[0][1].value).toEqual([]);
	});

	it('should select an item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				value={[{ id: '111', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		wrapper
			.find('.tc-enumeration-item-label')
			.at(0)
			.simulate('click');

		// then
		// number of selected item and trash icon
		expect(wrapper.find('.tc-enumeration-header span').length).toBe(1);
		expect(wrapper.find('.tc-enumeration-header button').length).toBe(1);
		expect(wrapper.find('.tc-enumeration-item.selected-item').length).toBe(1);
	});

	it('should select multiple  items', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				value={[
					{ id: '111', values: ['titi', 'tata'] },
					{ id: '112', values: ['titi2', 'tata2'] },
				]}
			/>,
		);

		// when
		wrapper
			.find('button.tc-enumeration-item-label')
			.at(0)
			.simulate('click');
		wrapper
			.find('button.tc-enumeration-item-label')
			.at(1)
			.simulate('click', { ctrlKey: true });

		// then
		// number of selected item and trash icon
		expect(wrapper.find('.tc-enumeration-header span').length).toBe(1);
		expect(wrapper.find('.tc-enumeration-header button').length).toBe(1);
		expect(wrapper.find('.tc-enumeration-item.selected-item').length).toBe(2);
	});

	it('delete all', () => {
		// given
		const onChange = jest.fn();
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				onChange={onChange}
				onFinish={jest.fn()}
				value={[
					{ id: '112', values: ['titi', 'tata'] },
					{ id: '113', values: ['titi2', 'tata2'] },
				]}
			/>,
		);
		expect(wrapper.find('.tc-enumeration-item').length).toBe(2);

		wrapper
			.find('button.tc-enumeration-item-label')
			.at(0)
			.simulate('click');
		wrapper
			.find('button.tc-enumeration-item-label')
			.at(1)
			.simulate('click', { ctrlKey: true });

		// when click on trash icon
		wrapper
			.find('.tc-enumeration-header')
			.find('.btn-link')
			.at(0)
			.simulate('click');

		// then
		expect(onChange.mock.calls[0][1].value).toEqual([]);
	});

	it('should delete an item calling onTrigger', () => {
		// given
		const onTrigger = jest.fn(() => Promise.resolve({}));
		const wrapper = mount(
			<EnumerationWidget
				properties={{
					connectedMode: true,
				}}
				schema={{}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={onTrigger}
				value={[{ id: '11212242', values: ['titi', 'tata'] }]}
			/>,
		);

		// when
		wrapper
			.find('.tc-enumeration-item-actions')
			.find('.btn-link')
			.at(1)
			.simulate('click');

		// then
		expect(onTrigger.mock.calls[0][1]).toEqual({
			schema: {},
			trigger: {
				action: 'ENUMERATION_REMOVE_ACTION',
				ids: ['11212242'],
			},
		});
	});

	it('should deselect edit mode when select other item', () => {
		// given
		const wrapper = mount(
			<EnumerationWidget
				schema={{}}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				value={[
					{ id: '111', values: ['titi', 'tata'] },
					{ id: '112', values: ['toto', 'tutu'] },
				]}
			/>,
		);

		// edit item
		wrapper
			.find('.tc-enumeration-item-actions')
			.find('.btn-link')
			.at(0)
			.simulate('click');

		// when select another item
		wrapper
			.find('.tc-enumeration-item-label')
			.at(1)
			.simulate('click');

		// should reset all items to default mode
		expect(wrapper.find('.tc-enumeration-item input').length).toBe(0);
		expect(wrapper.find('.tc-enumeration-item button.tc-enumeration-item-label').length).toBe(2);
	});

	describe('upload file', () => {
		it('should add a upload icon and set data-feature', () => {
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
						'data-feature': {
							overwriteExisting: 'file.overwrite',
							addFromFile: 'file.add',
							importFile: 'file.import',
						},
					}}
				/>,
			);
			expect(toJsonWithoutI18n(wrapper)).toMatchSnapshot();
		});

		it('should send a event with a method to simulate the click on the input file', () => {
			// given
			const wrapper = mount(
				<EnumerationWidget
					properties={{
						connectedMode: true,
					}}
					schema={{
						allowImport: true,
					}}
				/>,
			);

			wrapper.instance().simulateClickInputFile = jest.fn();

			// when
			wrapper
				.find('.tc-enumeration-header')
				.find('.btn-link')
				.at(1)
				.simulate('click');

			// then
			expect(wrapper.instance().simulateClickInputFile).toHaveBeenCalled();
		});

		it('should send a event when we click on the icon of the dropdown', () => {
			// given
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
					uiSchema={{}}
				/>,
			);

			wrapper.instance().simulateClickInputFile = jest.fn();

			// when
			wrapper
				.find('.tc-enumeration-header div.btn-group-link button')
				.at(0)
				.simulate('click');

			// then
			expect(wrapper.instance().simulateClickInputFile).toHaveBeenCalled();
		});

		it('should send a event with the choice APPEND', () => {
			// given
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
					uiSchema={{}}
				/>,
			);

			wrapper.instance().simulateClickInputFile = jest.fn();

			// when
			wrapper
				.find('.tc-enumeration-header div.btn-group-link li a')
				.at(0)
				.simulate('click');

			// then
			expect(wrapper.instance().simulateClickInputFile).toHaveBeenCalled();
		});

		it('should send a event with the choice OVERWRITE', () => {
			// given
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
					uiSchema={{}}
				/>,
			);

			wrapper.instance().simulateClickInputFile = jest.fn();

			// when
			wrapper
				.find('.tc-enumeration-header div.btn-group-link li a')
				.at(1)
				.simulate('click');

			// then
			expect(wrapper.instance().simulateClickInputFile).toHaveBeenCalled();
		});

		it('should set header back to default and import mode to empty after upload', () => {
			// given
			const onChange = jest.fn();
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
					properties={{
						connectedMode: true,
					}}
					onChange={onChange}
					onFinish={jest.fn()}
				/>,
			);

			// when
			wrapper.instance().importFileHandler();

			// then
			expect(wrapper.instance().state.headerDefault.length).toBe(3);
			expect(wrapper.instance().state.importMode).toBe('');
		});

		it('should simulate click on the input', () => {
			// given
			jest.useFakeTimers();
			const wrapper = mount(
				<EnumerationWidget
					schema={{
						allowImport: true,
					}}
				/>,
			);
			wrapper.instance().state.importMode = enumerationStates.IMPORT_MODE_APPEND;
			wrapper.instance().inputFile.click = jest.fn();
			spyOn(document.activeElement, 'blur').and.callThrough();

			// when
			wrapper.instance().simulateClickInputFile();
			jest.runAllTimers();

			// then
			expect(wrapper.instance().inputFile.click).toBeCalled();
			expect(document.activeElement.blur).toBeCalled();
		});

		it(
			'should trigger a event when the user clicks on the upload action' +
				', shows a loading and return to initial state when we call the success callback',
			() => {
				// given
				const onTrigger = jest.fn(() =>
					Promise.resolve([
						{
							id: 1,
							values: ['val1'],
						},
						{
							id: 2,
							values: ['val2'],
						},
					]),
				);
				const onFinish = jest.fn();
				const onChange = jest.fn();
				const wrapper = mount(
					<EnumerationWidget
						id="enumeration"
						schema={{
							allowImport: true,
						}}
						onTrigger={onTrigger}
						onFinish={onFinish}
						onChange={onChange}
						properties={{
							connectedMode: true,
						}}
						value={[
							{ id: '111', values: ['titi', 'tata'] },
							{ id: '112', values: ['titi2', 'tata2'] },
						]}
					/>,
				);

				const event = {
					target: {
						files: ['file'],
					},
				};

				wrapper.instance().resetInputFile = jest.fn();

				// when
				return wrapper
					.instance()
					.importFile(event)
					.then(() => {
						// then
						expect(onTrigger).toBeCalledWith(event, {
							schema: { allowImport: true },
							trigger: {
								action: 'ENUMERATION_IMPORT_FILE_ACTION',
								importMode: undefined,
								label: undefined,
								value: 'file',
							},
						});

						expect(wrapper.instance().resetInputFile).toBeCalled();
						expect(onChange).toBeCalledWith(event, {
							schema: { allowImport: true },
							value: [
								{ id: 1, values: ['val1'] },
								{ id: 2, values: ['val2'] },
							],
						});
					});
			},
		);
	});

	describe('utils method', () => {
		it('should split with using coma separator and trim the sub strings', () => {
			// given
			const enumerationWidget = new EnumerationWidget({
				t: () => {},
			});
			// when
			const resultArray = enumerationWidget.constructor.parseStringValueToArray(
				'toto ,  to , tata ',
			);
			// then
			expect(resultArray).toEqual(['toto', 'to', 'tata']);
		});

		it('should compute the correct item when in search mode', () => {
			// given
			const enumerationWidget = new EnumerationWidget({
				t: () => {},
			});
			spyOn(enumerationWidget, 'searchItems').and.returnValue([{ values: ['toto'] }]);
			// when
			const resultArray = enumerationWidget.getItemInSearchMode('toto', 0, [
				{ values: ['toto'] },
				{ values: ['tata'] },
				{ values: ['titi'] },
			]);

			// then
			expect(resultArray).toEqual({ values: ['toto'] });
		});
	});
});
