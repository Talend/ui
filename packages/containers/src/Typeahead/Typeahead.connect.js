import { cmfConnect } from '@talend/react-cmf';
import Container from './Typeahead.container';

export default cmfConnect({
	componentId: ownProps => ownProps.id || 'Typeahead',
})(Container);
