/* eslint-disable import/no-extraneous-dependencies */
import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Icon } from './';

describe('Icon', () => {
	it('should render a11y html', async () => {
		global.self.fetch.mockResponse = {
			status: 200,
			ok: true,
			text: () =>
				new Promise(resolve => {
					resolve(undefined);
				}),
		};
		const { container } = render(
			<main>
				<Icon name="pencil" />
				<Icon name="src-https://statics-dev.cloud.talend.com/@talend/common/images/favicon-logo-square.ico" />
				<Icon name="remote-https://unpkg.com/@talend/icons@6.1.5/src/svg/core/abc.svg" />
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
