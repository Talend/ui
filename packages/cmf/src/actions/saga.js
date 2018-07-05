import CONST from '../constant';

export function start(event = {}, data) {
	return {
		type: CONST.DID_MOUNT_SAGA_START,
		event,
		...data,
	};
}

export function stop(event, data) {
	return {
		type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_${data.saga}`,
		event,
	};
}
