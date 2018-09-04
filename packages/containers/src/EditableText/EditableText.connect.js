import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './EditableText.container';

export default cmfConnect({
	defaultState: DEFAULT_STATE,
})(Container);
