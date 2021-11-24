import omit from 'lodash/omit';
import CONST from '../constant';

const propsToOmit = ['children', 'getComponent'].concat(CONST.INJECTED_PROPS, CONST.CMF_PROPS);

export function start(event = {}, data) {
	return {
		type: CONST.DID_MOUNT_SAGA_START,
		saga: data.saga,
		componentId: data.componentId,
		props: omit(data, propsToOmit), // deprecated
		event,
	};
}

export function stop(event, data) {
	return {
		type: `${CONST.WILL_UNMOUNT_SAGA_STOP}_${data.saga}`,
		event,
	};
}
