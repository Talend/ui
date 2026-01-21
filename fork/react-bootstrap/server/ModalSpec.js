// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from 'chai';

import ReactDOMServer from 'react-dom/server';

import Modal from '../src/Modal';

describe('Modal', () => {
	it('Should be rendered on the server side', () => {
		const noOp = () => {};

		assert.doesNotThrow(() =>
			ReactDOMServer.renderToString(
				<Modal onHide={noOp}>
					<strong>Message</strong>
				</Modal>,
			),
		);
	});
});
