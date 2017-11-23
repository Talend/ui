import { cmfConnect } from '@talend/react-cmf';
import SubHeaderBar, { DEFAULT_STATE } from './SubHeaderBar.container';

function mapStateToPops(state, ownProps) {
    
    


}

export default cmfConnect({
	componentId: ownProps => ownProps.id,
	defaultState: DEFAULT_STATE,
	mapStateToPops,
})(SubHeaderBar);
