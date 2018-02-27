import { cmfConnect } from '@talend/react-cmf';
import Container, { DEFAULT_STATE } from './Typeahead.container';

export default cmfConnect({
	componentId: ownProps => ownProps.id || 'Typeahead',
	defaultState: DEFAULT_STATE,
})(Container);
