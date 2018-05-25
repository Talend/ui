import omit from 'lodash/omit';
import CONST from '../constant';
import { CMF_PROPS, INJECTED_PROPS } from '../cmfConnect';

const propsToOmit = ['children', 'getComponent'].concat(INJECTED_PROPS, CMF_PROPS);

export function start(event = {}, data) {
	return {
		type: CONST.DID_MOUNT_SAGA_START,
		saga: data.saga,
		props: omit(data, propsToOmit),
		event,
	};
}

export function stop(event, data) {
	return {
		type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_${data.saga}`,
		event,
	};
}
