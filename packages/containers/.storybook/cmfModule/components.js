import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import React from 'react';

// Simple overlay component used by Storybook CMF module
function ComponentOverlay(props) {
	return React.createElement('div', null, `Component overlay with ${props.customProps}`);
}

ComponentOverlay.propTypes = {
	customProps: PropTypes.string,
};

const ConnectedComponentOverlay = cmfConnect({ mapStateToProps: () => ({}) })(ComponentOverlay);

export default {
	ComponentOverlay: ConnectedComponentOverlay,
};
