import TreeView from './index';
import Container from './TreeView.container';

describe('TreeView.index', () => {
	it('should be TreeView from container', () => {
		expect(TreeView).toBe(Container);
	});
});
