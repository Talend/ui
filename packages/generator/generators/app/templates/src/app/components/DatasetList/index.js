import { connect } from 'react-redux';
import DatasetList from './DatasetList.component';
import DatasetService from '../../services/dataset';

function mapStateToProps(state) {
	return {
		datasets: DatasetService.selectors.getDatasets(state),
		isFetching: DatasetService.selectors.getIsFetching(state),
	};
}

const mapDispatchToProps = {
	fetchDatasets: DatasetService.actionCreators.fetchDatasets,
	removeDataset: DatasetService.actionCreators.removeDataset,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DatasetList);
