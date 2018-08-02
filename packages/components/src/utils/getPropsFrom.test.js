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
			target: '_blank',
			rel: 'noopener noreferrer',
			type: 'button',
			'aria-label': 'aria-label',
			'data-feature': 'data-feature',
			role: 'button',

			// native props should be kept
			className: 'my class',

			// unknown props should be removed
			waattt: 'the hell',
		};

		// when
		const buttonProps = getPropsFrom(Button, props);

		// then
		expect(buttonProps).toEqual({
			active: true,
			'aria-label': 'aria-label',
			'data-feature': 'data-feature',
			disabled: false,
			block: false,
			onClick,
			href: 'www.google.de',
			type: 'button',
			className: 'my class',
			target: '_blank',
			rel: 'noopener noreferrer',
			role: 'button',
		});
	});
});
