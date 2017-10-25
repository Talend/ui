import { Button } from 'react-bootstrap';
import faker from 'faker';

import getPropsFrom from './getPropsFrom';

faker.seed(42);
describe('Action', () => {
	it('should extract Button props', () => {
		// given
		const onClick = jest.fn();
		const props = {
			active: true,
			disabled: false,
			block: false,
			onClick,
			href: faker.internet.url(),
			type: 'button',

			// native props should be kept
			className: faker.random.words(),

			// unknown props should be removed
			waattt: faker.random.words(),
		};

		// when
		const buttonProps = getPropsFrom(Button, props);

		// then
		expect(buttonProps).toEqual({
			active: props.active,
			disabled: props.disabled,
			block: props.block,
			onClick,
			href: props.href,
			type: props.type,
			className: props.className,
		});
	});
});
