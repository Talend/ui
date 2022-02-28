import React from 'react';
import withMock from 'storybook-addon-mock';

import Action from '../Action';
import AboutDialog from '.';

export default {
	title: 'AboutDialog',
	decorators: [withMock],
};

export const Default = () => (
	<div>
		<Action actionId="about-dialog:show" />
		<AboutDialog icon="talend-tdp-colored" />
	</div>
);
Default.parameters = {
	mockData: [
		{
			url: 'https://tdp.us.cloud.talend.com/api/version',
			method: 'GET',
			status: 200,
			response: {
				data: {
					displayVersion: 'R2022-01',
					services: [
						{ versionId: '3.33.0-4.13.1', buildId: '5759adb-4022e15', serviceName: 'API' },
						{ versionId: '3.33.0-4.13.1', buildId: '5759adb-4022e15', serviceName: 'Preparation' },
						{
							versionId: '3.33.0-4.13.1',
							buildId: '5759adb-4022e15',
							serviceName: 'Transformation',
						},
						{ versionId: '3.33.0-4.13.1', buildId: '5759adb-4022e15', serviceName: 'Fullrun' },
						{ versionId: '10.1.0', buildId: 'a849f4f', serviceName: 'Semantic Types Producer' },
					],
				},
			},
		},
	],
};
