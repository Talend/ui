import { cmfConnect } from '@talend/react-cmf';
import { Drawer } from '@talend/react-components';
import TabBar from '../TabBar';
import Immutable from 'immutable';

export const DEFAULT_STATE = new Immutable.Map({});

function mapStateToProps(state, props) {
	return {
		selectedTabKey: TabBar.selectors.getSelectedKey(state, props.tabs.componentId),
	};
}

export default cmfConnect({
	componentId: ownProps => ownProps.componentId || ownProps.id,
	mapStateToProps,
})(Drawer);
