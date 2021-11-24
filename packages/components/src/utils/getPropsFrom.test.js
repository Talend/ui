import { Button } from 'react-bootstrap';
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
		const buttonProps = getPropsFrom(Button, props);

		// then
		expect(buttonProps).toEqual({
			'aria-label': 'aria-label',
			'data-feature': 'data-feature',
			active: true,
			autoFocus: true,
			block: false,
			className: 'my class',
			disabled: false,
			id: 'my-id',
			href: 'www.google.de',
			name: 'toto',
			onClick,
			rel: 'noopener noreferrer',
			role: 'button',
			tabIndex: 1,
			target: '_blank',
			title: 'my title',
			type: 'button',
			form: 'my-super-form-id',
		});
	});
});
