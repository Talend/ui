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
	return {};
}

export default cmfConnect({ mapStateToProps })(ComponentOverlay);

/**
 * Forked.hide
Forked.render
Forked.makeOverlay this._overlay = VIRTUALDOM JSX
Forked.did update
Forked.renderOverlay
Forked.show
Forked.render
Forked.makeOverlay
Forked.did update
Forked.renderOverlay
 */
