import Connected, { ContainerBreadcrumbs } from './Breadcrumbs.connect';

describe('Connected Breadcrumbs', () => {
	it('should connect Breadcrumbs', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerBreadcrumbs.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerBreadcrumbs);
	});
});
