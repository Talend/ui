import ACKDispatcher from './components/ACKDispatcher';
import reducers from './reducers';

const components = {
	ACKDispatcher,
};

export default {
	components,
	preReducer: reducers.ackProcessed,
	reducer: { ack: reducers.ack },
};
