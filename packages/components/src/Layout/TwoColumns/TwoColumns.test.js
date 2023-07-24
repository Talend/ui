import { render } from '@testing-library/react';
import TwoColumns from './TwoColumns.component';

describe('TwoColumns', () => {
	it('should render', () => {
		// given
		const one = <div>Hello world</div>;

		// when
		const { container } = render(
			<TwoColumns one={one} style={{ display: 'flex' }}>
				<span>children</span>
			</TwoColumns>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
