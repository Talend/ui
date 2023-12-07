import { Action } from '../Actions';
import getPropsFrom from './getPropsFrom';

describe('Action', () => {
	it('should extract Button props', () => {
		// given
		const onClick = jest.fn();
		const props = {
			active: true,
			disabled: false,
			block: false,
			onClick,
			href: 'www.google.de',
			type: 'button',
			'aria-label': 'aria-label',
			'data-feature': 'data-feature',

			// native props should be kept
			autoFocus: true,
			className: 'my class',
			name: 'toto',
			id: 'my-id',
			rel: 'noopener noreferrer',
			role: 'button',
			tabIndex: 1,
			target: '_blank',
			title: 'my title',
			form: 'my-super-form-id',

			// unknown props should be removed
			waattt: 'the hell',
			titleWat: 'lol',
		};

		// when
		const buttonProps = getPropsFrom(Action, props);

		// then
		expect(buttonProps).toEqual({
			'aria-label': 'aria-label',
			'data-feature': 'data-feature',
			autoFocus: true,
			className: 'my class',
			id: 'my-id',
			name: 'toto',
			rel: 'noopener noreferrer',
			role: 'button',
			tabIndex: 1,
			target: '_blank',
			title: 'my title',
			form: 'my-super-form-id',
		});
	});
});
