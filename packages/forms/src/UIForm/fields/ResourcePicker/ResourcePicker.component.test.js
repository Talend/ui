import React from 'react';
import { shallow } from 'enzyme';
// import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';

import ResourcePicker from './ResourcePicker.component';

describe('ResourcePicker field', () => {
	const schema = {
		title: 'My ResourcePicker title',
		description: 'ResourcePicker me',
		placeholder: 'Please select a value',
		required: true,
		schema: {
			type: 'object',
		},
	};

	it('should render simple select', () => {
		const wrapper = shallow(
			<ResourcePicker
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn(() => Promise.resolve())}
				schema={schema}
			/>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should call onTrigger when mounting component', () => {
		const collection = [
			{
				id: 0,
				name: 'Title with few actions',
				modified: 1442880000000,
				icon: 'talend-file-xls-o',
				author: 'First Author',
				flags: ['CERTIFIED', 'FAVORITE'],
			},
			{
				id: 1,
				name: 'Title with lot of actions',
				modified: 1537574400000,
				icon: 'talend-file-xls-o',
				author: 'Second Author',
			},
			{
				id: 2,
				name: 'Title with persistant actions',
				modified: 1474502400000,
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-xls-o',
				flags: ['FAVORITE'],
			},
			{
				id: 3,
				name: 'Title with icon',
				modified: 1506038400000,
				author: 'Third Author',
				icon: 'talend-file-xls-o',
				flags: ['CERTIFIED'],
			},
			{
				id: 4,
				name: 'Title in input mode',
				modified: 1506038400000,
				author: 'Jean-Pierre DUPONT',
				icon: 'talend-file-xls-o',
			},
			{
				id: 5,
				name: 'Title with long long long long long long long long long long long text',
				modified: 1547478328552,
				author: 'Jean-Pierre DUPONT with super super super long text',
				icon: 'talend-file-xls-o',
				flags: ['CERTIFIED', 'FAVORITE'],
			},
		];
		const props = {
			onChange: jest.fn(),
			onFinish: jest.fn(),
			onTrigger: jest.fn(
				event =>
					new Promise(resolve => {
						// hack: to be sure we catch the setState after the promise
						setTimeout(() => {
							expect(event.target.state.isLoading).toBe(false);
							// done();
						}, 0);
						return resolve({ collection });
					}),
			),
			schema: {
				title: 'My ResourcePicker title',
				description: 'ResourcePicker me',
				placeholder: 'Please select a value',
				required: true,
				schema: {
					type: 'object',
				},
			},
		};

		shallow(<ResourcePicker {...props} />);

		expect(props.onTrigger).toBeCalledWith(undefined, {
			schema: props.schema,
			errors: props.errors,
			properties: props.properties,
			trigger: {
				parameters: {
					certified: false,
					favorites: false,
					name: '',
					selected: [],
					selection: false,
				},
			},
		});
	});
});
