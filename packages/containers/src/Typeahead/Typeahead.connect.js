import { cmfConnect } from '@talend/react-cmf';
import Typeahead, { DEFAULT_STATE } from './Typeahead.container';

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	defaultState: DEFAULT_STATE,
})(Typeahead);
