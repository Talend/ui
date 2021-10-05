import { channel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';
import ack from './ack';
import { ACK_RECEIVE_MESSAGE } from '../constants';

describe('sagas.ack', () => {
	const testRequestId = 'id';

	it('should wait for acknowledgements and put them on a channel', () => {
		const chan = channel();
		const gen = ack.listen(chan, testRequestId);
		expect(gen.next().value).toEqual(take(ACK_RECEIVE_MESSAGE));
		expect(gen.next({ type: ACK_RECEIVE_MESSAGE, requestId: testRequestId }).value).toEqual(
			put(chan, testRequestId),
		);
	});

	it('should check for acknowledgements on the channel', () => {
		const chan = channel();
		const acknowledgement = ack.check(chan, testRequestId);
		expect(acknowledgement.next().value).toEqual(take(chan));
		expect(acknowledgement.next(testRequestId).value).toEqual(true);
	});
});
