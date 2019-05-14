import { cmfConnect } from '@talend/react-cmf';
import DatasetList from './DatasetList.component';
import DatasetService from '../../services/dataset';

function mapStateToProps(state) {
	return {
		datasets: DatasetService.selectors.getDatasets(state),
		isFetching: DatasetService.selectors.getIsFetching(state),
	};
}

export default cmfConnect({
	mapStateToProps,
	withDispatchActionCreator: true,
})(DatasetList);
