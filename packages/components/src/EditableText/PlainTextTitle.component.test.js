import { shallow } from 'enzyme';
import { PlainTextTitle } from './PlainTextTitle.component';
// rewrite tests using RTL
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('PlainTextTitle', () => {
	it('should render', () => {
		const props = {
			text: 'text',
			feature: 'my.custom.feature',
			onEdit: jest.fn(),
		};
		const { container } = render(<PlainTextTitle {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render provided component class', () => {
		const props = {
			text: 'text',
			feature: 'my.custom.feature',
			onEdit: jest.fn(),
			componentClass: 'h1',
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render in disabled state', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			disabled: true,
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);

		expect(wrapper.find('Action').prop('disabled')).toBe(true);
	});

	it('should render inProgress state', () => {
		const props = {
			text: 'text',
			onEdit: jest.fn(),
			inProgress: true,
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		expect(wrapper.find('Action').prop('disabled')).toBe(true);
	});

	it('should trigger onEdit when click on the action', () => {
		const onEdit = jest.fn();
		const props = {
			text: 'text',
			onEdit,
			inProgress: true,
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		wrapper.find('Action').simulate('click');
		expect(onEdit).toHaveBeenCalled();
	});

	it('should render empty text with pencil', () => {
		const props = {
			text: '',
			onEdit: jest.fn(),
		};
		const wrapper = shallow(<PlainTextTitle {...props} />);
		expect(
			wrapper.find('Action').props().className.includes('tc-editable-text-empty-pencil'),
		).toBeTruthy();
	});
});
