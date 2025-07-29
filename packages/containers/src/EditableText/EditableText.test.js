import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Map } from 'immutable';

import cmf, { mock } from '@talend/react-cmf';

import Connect from './EditableText.connect';
import Container, { DISPLAY_NAME } from './EditableText.container';
import { getEditMode } from './EditableText.selectors';

jest.unmock('@talend/design-system');

describe('Connect', () => {
	it('should connect EditableText', () => {
		expect(Connect.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connect.WrappedComponent).toBe(Container);
	});
});

describe('EditableText container', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
	it('should render', () => {
		const { container } = render(
			<App {...mock.store.context()}>
				<Container text="test" />
			</App>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should setState when submit event trigger', async () => {
		let state;
		const props = {
			state: Map({ editMode: true }),
			setState: jest.fn(fn => {
				state = fn;
			}),
			onCancel: jest.fn(),
			onSubmit: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Submit'));
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
		expect(props.onSubmit).toHaveBeenCalledWith(expect.anything(), {
			value: 'my text',
			props: expect.anything(props),
		});
	});
	it('should call ActionCreatorSubmit when submit event trigger', async () => {
		const event = {};
		const props = {
			actionCreatorSubmit: 'mySubmitActionCreator',
			dispatchActionCreator: jest.fn(),
			state: Map({ editMode: true }),
			setState: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Submit'));
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(
			props.actionCreatorSubmit,
			expect.anything(event),
			{
				props,
				data: {
					props: expect.anything(props),
					value: 'my text',
				},
			},
		);
	});
	it('should setState when cancel event trigger', async () => {
		let state;
		const props = {
			state: Map({ editMode: true }),
			setState: jest.fn(fn => {
				state = fn;
			}),
			onCancel: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Cancel'));
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(false);
	});
	it('should call onCancel when cancel event trigger', async () => {
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: true }),
			onCancel: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Cancel'));
		expect(props.onCancel).toHaveBeenCalledWith(expect.anything());
	});
	it('should call actionCreatorCancel when cancel event trigger', async () => {
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: true }),
			actionCreatorCancel: 'myCancelActionCreator',
			dispatchActionCreator: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Cancel'));
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(
			props.actionCreatorCancel,
			expect.anything(),
			{
				props,
			},
		);
	});
	it('should call setState when edit event trigger', async () => {
		let state;
		const props = {
			state: Map({ editMode: false }),
			setState: jest.fn(fn => {
				state = fn;
			}),
			onCancel: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Rename'));
		expect(props.setState).toHaveBeenCalled();
		expect(state.editMode).toEqual(true);
	});
	it('should call onEdit when edit event trigger', async () => {
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			onEdit: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Rename'));
		expect(props.onEdit).toHaveBeenCalledWith(expect.anything());
	});
	it('should call onEdit when edit event trigger', async () => {
		const props = {
			setState: jest.fn(),
			state: Map({ editMode: false }),
			dispatchActionCreator: jest.fn(),
			actionCreatorEdit: 'myEditActionCreator',
			text: 'my text',
		};
		render(<Container {...props} />);
		await userEvent.click(screen.getByLabelText('Rename'));
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(
			props.actionCreatorEdit,
			expect.anything(),
			{
				props,
			},
		);
	});
	it('should call onChange when change event trigger', async () => {
		const user = userEvent.setup();

		const props = {
			setState: jest.fn(),
			state: Map({ editMode: true }),
			onChange: jest.fn(),
			text: 'my text',
		};
		render(<Container {...props} />);
		const textbox = screen.getByRole('textbox');
		await user.click(textbox);
		await user.clear(textbox);
		await user.keyboard('my onChangeTitle');
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), 'my onChangeTitle');
	});
	it('should call onChange when change event trigger - actionCreatorChange', async () => {
		const user = userEvent.setup();

		const props = {
			setState: jest.fn(),
			state: Map({ editMode: true }),
			dispatchActionCreator: jest.fn(),
			actionCreatorChange: 'myChangeActionCreator',
			text: 'my text',
		};
		render(<Container {...props} />);
		const textbox = screen.getByRole('textbox');
		await user.click(textbox);
		await user.clear(textbox);
		await user.keyboard('my onChangeTitle');
		expect(props.dispatchActionCreator).toHaveBeenCalledWith(
			props.actionCreatorChange,
			expect.anything(),
			{
				props,
				value: 'my onChangeTitle',
			},
		);
	});
});

describe('EditableText selectors', () => {
	let mockState;
	const componentState = Map({ editMode: true });
	beforeEach(() => {
		mockState = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ myEditableText: componentState }) }),
			},
		};
	});
	it('should return the editMode', () => {
		expect(getEditMode(mockState, 'myEditableText')).toEqual(true);
	});
	it('should return the editModet', () => {
		expect(getEditMode(mockState, 'wrongComponentId')).toEqual(false);
	});
});
