import { render, screen } from '@testing-library/react';

import Message from './Message.component';

jest.unmock('@talend/design-system');

describe('Message component', () => {
	it('should render provided description and no error if the field is valid', () => {
		// when
		const { container } = render(
			<Message
				descriptionId="my-message-description"
				errorId="my-message-error"
				errorMessage="My error message"
				description="My description"
				isValid
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render provided error message and no description if the field is invalid', () => {
		// when
		render(
			<Message
				descriptionId="my-message-description"
				errorId="my-message-error"
				errorMessage="My error message"
				description="My description"
				isValid={false}
			/>,
		);

		// then
		expect(screen.getByText('My error message')).toBeInTheDocument();
		expect(screen.queryByText('My description')).not.toBeInTheDocument();
	});

	it('should render empty div when field is valid and no description is provided', () => {
		// when
		const { container } = render(
			<Message
				descriptionId="my-message-description"
				errorId="my-message-error"
				errorMessage="My error message"
				isValid
			/>,
		);

		// then
		expect(container).toBeEmptyDOMElement();
	});
});
