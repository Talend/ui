import React from 'react';
import { shallow } from 'enzyme';
import File, { FileWidget } from './File.component';

describe('File field', () => {
	const schema = {
		autoFocus: false,
		description: 'This is the file field',
		placeholder: 'Select a file to upload',
		disabled: false,
		readOnly: false,
		title: 'Upload file',
	};

	const props = {
		id: 'my-file-field',
		required: false,
		isValid: true,
		errorMessage: 'This is wrong',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		schema,
		value: '',
	};

	const propsWithPresignedUrlTrigger = {
		...props,
		onTrigger: jest.fn(),
		schema: {
			...props.schema,
			triggers: [
				{
					action: 'generatePresignedURL',
					family: 'LocalStorage',
					type: 'presignedURL',
					parameters: [
						{ path: 'configuration.datastore.$selfReference', key: 'datastore.$selfReference' },
						{ path: 'configuration.pathStyleAccess', key: 'pathStyleAccess' },
						{ path: '$remoteEngineId', key: '$remoteEngineId' },
					],
					onEvent: 'change',
				},
			],
		},
	};

	it('should render default File', () => {
		// when
		const wrapper = shallow(<File.WrappedComponent {...props} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render File with data', () => {
		// given
		const valuedProps = {
			...props,
			value: 'data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0i',
		};

		// when
		const wrapper = shallow(<File.WrappedComponent {...valuedProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render File with pre-signed url related trigger', () => {
		// given
		const valuedProps = {
			...propsWithPresignedUrlTrigger,
			value: '93843640-ed30-4174-898b-69499da9e679.Ni5hdnJv',
		};

		// when
		const wrapper = shallow(<File.WrappedComponent {...valuedProps} />);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should trigger onChange when user select file', () => {
		// given
		const wrapper = shallow(<File.WrappedComponent {...props} />);
		expect(props.onChange).not.toBeCalled();
		const testContent = { test: 'content' };
		const blob = new Blob([JSON.stringify(testContent, null, 2)], {
			type: 'application/json',
			name: 'test.json',
		});
		const event = {
			persist: jest.fn(),
			preventDefault: jest.fn(),
			target: {
				files: [blob],
			},
		};
		const value = 'data:application/json;name=;base64,ewogICJ0ZXN0IjogImNvbnRlbnQiCn0=';

		// when
		const fileInput = wrapper.find('input[type="file"]');
		fileInput.simulate('change', event);

		// then
		// Loading a file is asynchronous, so wait for the file to be loaded
		setTimeout(() => {
			expect(props.onChange).toHaveBeenCalledWith(event, { schema, value });
		}, 500);
	});

	it('should trigger pre-signed url related onChange when user select file', () => {
		// given
		const wrapper = shallow(<File.WrappedComponent {...propsWithPresignedUrlTrigger} />);
		expect(props.onChange).not.toBeCalled();
		const testContent = { test: 'content' };
		const blob = new Blob([JSON.stringify(testContent, null, 2)], {
			type: 'application/json',
			name: 'test.json',
		});
		const event = {
			persist: jest.fn(),
			preventDefault: jest.fn(),
			target: {
				files: [blob],
			},
		};
		const value = '93843640-ed30-4174-898b-69499da9e679.Ni5hdnJv';

		// when
		const fileInput = wrapper.find('input[type="file"]');
		fileInput.simulate('change', event);

		// then
		// Loading a file is asynchronous, so wait for the file to be loaded
		setTimeout(() => {
			expect(props.onChange).toHaveBeenCalledWith(event, { schema, value });
			expect(props.onTrigger).toHaveBeenCalledWith(event, { schema, value });
		}, 500);
	});

	it('should trigger onChange when user cancel file', () => {
		// given
		const wrapper = shallow(<File.WrappedComponent {...props} />);
		const event = {
			persist: jest.fn(),
			preventDefault: jest.fn(),
			target: {
				files: [],
			},
		};
		const value = 'data:application/json;name=;base64,ewogICJ0ZXN0IjogImNvbnRlbnQiCn0=';

		// when
		const fileInput = wrapper.find('input[type="file"]');
		fileInput.simulate('change', event);

		// then
		// Loading a file is asynchronous, so wait for the file to be loaded
		setTimeout(() => {
			expect(props.onChange).toHaveBeenCalledWith(event, { schema, value });
		}, 500);
	});

	it('should not change filename in state when props are not updated', () => {
		// given
		const givenProps = {
			value: 'data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0i',
		};
		const givenState = {
			fileName: 'test.xml',
		};

		// when
		const result = FileWidget.getDerivedStateFromProps(givenProps, givenState);

		// then
		expect(result).toEqual(null);
	});

	it('should change filename in state when props are updated', () => {
		// given
		const givenProps = {
			value: '',
		};
		const givenState = {
			fileName: 'test.xml',
		};

		// when
		const result = FileWidget.getDerivedStateFromProps(givenProps, givenState);

		// then
		expect(result).toEqual({
			fileName: '',
		});
	});

	it('should change input content when props are updated', () => {
		// given
		const valuedProps = {
			...props,
			value: 'data:text/xml;name=test.xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0i',
		};

		// when
		const wrapper = shallow(<FileWidget {...valuedProps} />);

		// then state and text field contains 'test.xml'
		expect(wrapper.state('fileName')).toBe('test.xml');
		const textInput = wrapper.find('input[type="text"]');
		expect(textInput.props().value).toBe('test.xml');

		// when
		wrapper.setProps({ value: '' });

		// then state and text field contains ''
		expect(wrapper.state('fileName')).toBe('');
		const textInputUpdated = wrapper.find('input[type="text"]');
		expect(textInputUpdated.props().value).toBe('');
	});

	it('should change input content when props are updated with pre-signed url related trigger', () => {
		// given
		const valuedProps = {
			...propsWithPresignedUrlTrigger,
			value: '93843640-ed30-4174-898b-69499da9e679.Ni5hdnJv',
		};

		// when
		const wrapper = shallow(<FileWidget {...valuedProps} />);

		// then state and text field contains '6.avro'
		expect(wrapper.state('fileName')).toBe('6.avro');
		const textInput = wrapper.find('input[type="text"]');
		expect(textInput.props().value).toBe('6.avro');

		// when
		wrapper.setProps({ value: '' });

		// then state and text field contains ''
		expect(wrapper.state('fileName')).toBe('');
		const textInputUpdated = wrapper.find('input[type="text"]');
		expect(textInputUpdated.props().value).toBe('');
	});
});
