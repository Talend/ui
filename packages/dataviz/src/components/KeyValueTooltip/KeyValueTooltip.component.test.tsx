import { render } from '@testing-library/react';
import KeyValueTooltip from './KeyValueTooltip.component';

describe('TooltipContent', () => {
	it('Should render', () => {
		const { container } = render(
			<KeyValueTooltip
				entries={[
					{
						key: 'key1',
						value: 'value1',
					},
				]}
			/>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
