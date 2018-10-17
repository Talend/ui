import { COMPONENT_DID_MOUNT } from '../constants';

export default function componentDidMount(event, data) {
	return {
		type: COMPONENT_DID_MOUNT,
		component: event ? event.component : 'Unknown',
		componentId: data.componentId,
	};
}
