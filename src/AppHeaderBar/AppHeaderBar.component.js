import { connect } from 'react-redux';
import { AppHeaderBar } from 'react-talend-components/lib';

export function mapDispatchToProps(dispatch) {
	return {};
}

export function mapStateToProps(state) {
	return state.cmf.settings.views.appheaderbar || {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeaderBar);
