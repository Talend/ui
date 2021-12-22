import cmfConnect from '../../cmfConnect';
import { Saga } from './Saga.component';

export default cmfConnect({
	withDispatch: true,
})(Saga);
