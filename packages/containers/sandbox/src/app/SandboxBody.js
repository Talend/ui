import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from '@talend/react-cmf';
import ComponentForm from '../../../src/ComponentForm/ComponentForm.component';
import { isComponentFormDirty } from '../../../src/ComponentForm/ComponentForm.selectors';
import { setComponentFormDirtyState } from '../../../src/ComponentForm/ComponentForm.actions';

const componentId = 'external';
function SandboxBody({ dirty, dispatch }) {
	return (
		<div>
			<div style={{ padding: '20px' }}>
				{' '}
				<input
					style={{ marginRight: '10px' }}
					type="button"
					value="reset"
					onClick={() => dispatch(setComponentFormDirtyState(componentId, false))}
				/>
				Dirty state : {dirty.toString()}{' '}
			</div>
			<ComponentForm
				definitionURL="/api/v1/forms/titleMap"
				uiSpecPath="ui"
				triggerURL="/api/v1/application/action"
				className="full-form"
				componentId={componentId}
			/>
		</div>
	);
}
SandboxBody.displayName = 'SandboxBody';
SandboxBody.propTypes = {
	dirty: PropTypes.bool.isRequired,
	dispatch: PropTypes.func,
};

function mapStateToProps(state) {
	return { dirty: isComponentFormDirty(state, componentId) };
}

export default cmfConnect({ mapStateToProps, withDispatch: true })(SandboxBody);
