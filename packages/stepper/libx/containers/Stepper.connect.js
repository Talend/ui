import { connect } from 'react-redux';
import Stepper from '@talend/react-components/lib/Stepper';
import { getStepsForResource } from '../service/Stepper.selectors';
const mapStateToProps = (state, ownProps) => ({
	steps: getStepsForResource(state, ownProps.resourceType, ownProps.resourceId),
});
var Stepper_connect_default = connect(mapStateToProps)(Stepper);
export { Stepper_connect_default as default, mapStateToProps };
//# sourceMappingURL=Stepper.connect.js.map
