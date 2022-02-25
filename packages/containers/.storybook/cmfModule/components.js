import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import { registerAllContainers } from '../../src/register';
const ComponentOverlay = props => <div>Component overlay with {props.customProps}</div>;
ComponentOverlay.propTypes = {
	customProps: PropTypes.string,
};
const ConnectedComponentOverlay = cmfConnect({ mapStateToProps: () => {} })(ComponentOverlay);

registerAllContainers();
export default {
	ComponentOverlay: ConnectedComponentOverlay,
};
