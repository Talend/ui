import { connect } from 'react-redux';

import Container from './ActionBar.container';

export function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export function mapStateToProps() {}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
