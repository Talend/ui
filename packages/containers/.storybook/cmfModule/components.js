import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';

const ComponentOverlay = props => <div>Component overlay with {props.customProps}</div>;
ComponentOverlay.propTypes = {
	customProps: PropTypes.string,
};
const ConnectedComponentOverlay = cmfConnect({ mapStateToProps: () => {} })(ComponentOverlay);

export default {
	ComponentOverlay: ConnectedComponentOverlay,
};
