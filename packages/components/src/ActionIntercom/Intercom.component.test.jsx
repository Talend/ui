import { act } from 'react-dom/test-utils';

import { configure, render, screen } from '@testing-library/react';

import Intercom from './Intercom.component';
import IntercomService from './Intercom.service';

configure({ testIdAttribute: 'data-test' });

jest.mock('./Intercom.service', () => ({
	init: jest.fn(),
	boot: jest.fn(),
	update: jest.fn(),
	shutdown: jest.fn(),
	onHide: jest.fn(),
	onShow: jest.fn(),
	setPosition: jest.fn(),
}));

const config = {
	app_id: 'a218987bc6f',
	name: 'Jimmy Somsanith',
	email: 'jsomsanith@talend.com',
	company: {
		id: '1',
		name: 'talend',
	},
};

describe('Intercom button', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render a button', () => {
		// when
		render(<Intercom id="my-intercom" config={config} />);
		const button = screen.getByRole('button');

		// then
		expect(button).toBeInTheDocument();
	});

	it('should boot intercom at mount', () => {
		// given
		expect(IntercomService.boot).not.toHaveBeenCalled();

		// when
		render(<Intercom id="my-intercom" config={config} />);

		// then
		expect(IntercomService.boot).toHaveBeenCalledWith('#my-intercom', config);
	});

	it('should update intercom on config change', () => {
		// given
		const { rerender } = render(<Intercom id="my-intercom" config={config} />);
		expect(IntercomService.boot.mock.calls.length).toBe(1);

		const newConfig = { app_id: 'lol', email: 'foo@gmail.com' };

		// when
		rerender(<Intercom id="my-intercom" config={newConfig} />);

		// then
		expect(IntercomService.boot.mock.calls.length).toBe(2);
		expect(IntercomService.boot).toHaveBeenCalledWith('#my-intercom', newConfig);
	});

	it('should shutdown intercom at unmount', () => {
		// given
		const { rerender } = render(<Intercom id="my-intercom" config={config} />);
		expect(IntercomService.shutdown).not.toHaveBeenCalled();

		// when
		rerender(<span>Unmounted</span>);

		// then
		expect(IntercomService.shutdown).toHaveBeenCalled();
	});

	it('should change label on open/close', () => {
		// given
		const { rerender } = render(<Intercom id="my-intercom" config={config} />);
		const onShow = IntercomService.onShow.mock.calls[0][0];
		const onHide = IntercomService.onHide.mock.calls[0][0];
		expect(IntercomService.onShow).toHaveBeenCalled();
		expect(screen.getByRole('button')).toHaveAttribute('data-test', 'open');
		// when/then show
		act(() => {
			onShow();
		});
		rerender(<Intercom id="my-intercom" config={config} />);
		expect(screen.getByRole('button')).toHaveAttribute('data-test', 'close');

		// when/then hide
		act(() => {
			onHide();
		});
		rerender(<Intercom id="my-intercom" config={config} />);
		expect(screen.getByRole('button')).toHaveAttribute('data-test', 'open');
	});

	it('should set messenger position', () => {
		// given
		expect(IntercomService.setPosition).not.toHaveBeenCalled();

		// when
		render(<Intercom id="my-intercom" config={config} />);

		// then
		expect(IntercomService.setPosition).toHaveBeenCalled();
	});

	it('should focus on trigger button on hide', () => {
		// given
		const { rerender } = render(<Intercom id="my-intercom" config={config} />);
		const onShow = IntercomService.onShow.mock.calls[0][0];
		const onHide = IntercomService.onHide.mock.calls[0][0];

		act(() => {
			onShow();
		});
		rerender(<Intercom id="my-intercom" config={config} />);

		// when
		act(() => {
			onHide();
		});
		rerender(<Intercom id="my-intercom" config={config} />);

		// then
		expect(screen.getByTestId('open')).toBeInTheDocument();
	});
});
