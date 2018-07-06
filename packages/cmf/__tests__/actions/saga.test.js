import { start, stop } from '../../src/actions/saga';
import CONST from '../../src/constant';

describe('actions.saga', () => {
	it('start should return action object with DID_MOUNT_SAGA_START', () => {
		const event = { type: 'DID_MOUNT' };
		const data = { saga: 'mySaga', componentId: 'myComponent', foo: 'foo' };
		expect(start(event, data)).toEqual({
			type: CONST.DID_MOUNT_SAGA_START,
			event,
			saga: data.saga,
			props: { foo: 'foo' },
			componentId: 'myComponent',
		});
	});
	it('start should return action object with WILL_UNMUNT_SAGA_STOP', () => {
		const event = { type: 'WILL_UNMOUNT' };
		const data = { saga: 'mySaga' };
		expect(stop(event, data)).toEqual({
			type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_${data.saga}`,
			event,
		});
	});
});
