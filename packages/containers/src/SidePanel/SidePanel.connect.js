import cmfConnect from '../connect';
import Container, { DEFAULT_STATE } from './SidePanel.container';

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	keepComponentState: true,
})(Container);
