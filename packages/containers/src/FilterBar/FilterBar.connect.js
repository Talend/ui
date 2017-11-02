import { cmfConnect } from '@talend/react-cmf';
import Container from './FilterBar.container';

export default cmfConnect({
	componentId: ownProps => (ownProps && ownProps.id) || 'FilterBar',
})(Container);
