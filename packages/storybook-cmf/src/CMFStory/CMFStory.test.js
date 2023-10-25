import { render } from '@testing-library/react';
import CMFStory from './CMFStory.component';

describe('CMFStory', () => {
	it('should render its name', () => {
		const { container } = render(
			<CMFStory>
				<div>My Story</div>
			</CMFStory>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
