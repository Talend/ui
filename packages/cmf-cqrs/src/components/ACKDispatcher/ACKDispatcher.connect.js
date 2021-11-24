import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './ACKDispatcher.container';

export function mapStateToProps(state) {
	return {
		acks: state.ack,
	};
}

export default cmfConnect({
	componentId: 'ACKDispatcher', // can be a function
	defaultState: DEFAULT_STATE,
	mapStateToProps,
})(Container);
