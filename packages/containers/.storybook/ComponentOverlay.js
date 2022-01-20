import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
function ComponentOverlay(props) {
	return <div>Component overlay with {props.customProps}</div>;
}

ComponentOverlay.propTypes = {
	customProps: PropTypes.string,
};

function mapStateToProps(state) {
	debugger;
	return {};
}

export default cmfConnect({ mapStateToProps })(ComponentOverlay);
