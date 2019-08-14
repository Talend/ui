import { connect } from 'react-redux';
import { Stepper } from './Stepper.component';
import { getStepsForResource } from '../service/Stepper.selectors';

export const mapStateToProps = (state, ownProps) => ({
	steps: getStepsForResource(state, ownProps.resourceType, ownProps.resourceId),
});

export default connect(mapStateToProps)(Stepper);
