import Badge from '@talend/react-components/lib/Badge';
import Connected from './Badge.component';

describe('Connected Badge', () => {
	it('should connect Badge', () => {
		expect(Connected.displayName).toBe('Connect(CMF(Badge))');
		expect(Connected.WrappedComponent).toBe(Badge);
	});
});
