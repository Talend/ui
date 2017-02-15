import * as flowActions from './flow.actions';

describe('Check that flowActions generate proper action objects', () => {
	it('addFlowElements generate proper action object', () => {
		expect(flowActions.addFlowElements([])).toEqual({
			type: 'FLOWDESIGNER.FLOW_ADD_ELEMENTS',
			listOfActionCreation: [],
		});
	});
});

describe('setZoom', () => {
	it('should generate an action with proper shape', () => {
		expect(flowActions.setZoom({ k: 0, x: 0, y: 0 })).toMatchSnapshot();
	});

	it('if transform object is not well set return null', () => {
		expect(flowActions.setZoom({ k: 'yolo', x: 0, y: 0 })).toMatchSnapshot();
	});
});
