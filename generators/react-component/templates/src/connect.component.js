import { connect } from 'react-redux';
import <%= props.name %> from '<%= props.purePath %>';

export function mapDispatchToProps(dispatch) {
	return {};
}

export function mapStateToProps(state) {
	return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= props.name %>);
