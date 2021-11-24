import ConnectedComponentForm from './ComponentForm.component';

export function isComponentFormDirty(state, componentName) {
	return ConnectedComponentForm.getState(state, componentName).get('dirty', false);
}

export default isComponentFormDirty;
