/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

import AboutDialog from '.';
import Action from '../Action';

export default {
	title: 'AboutDialog',
};

export const Default = () => (
	<div>
		<Action actionId="about-dialog:show" />
		<AboutDialog icon="talend-tdp-colored" />
	</div>
);
Default.parameters = {
	msw: {
		handlers: [
			http.get('https://tdp.us.cloud.talend.com/api/version', () => {
				return new HttpResponse(
					JSON.stringify({
						displayVersion: 'R2022-01',
						services: [
							{ versionId: '3.33.0-4.13.1', buildId: '5759adb-4022e15', serviceName: 'API' },
							{
								versionId: '3.33.0-4.13.1',
								buildId: '5759adb-4022e15',
								serviceName: 'Preparation',
							},
							{
								versionId: '3.33.0-4.13.1',
								buildId: '5759adb-4022e15',
								serviceName: 'Transformation',
							},
							{ versionId: '3.33.0-4.13.1', buildId: '5759adb-4022e15', serviceName: 'Fullrun' },
							{ versionId: '10.1.0', buildId: 'a849f4f', serviceName: 'Semantic Types Producer' },
						],
					}),
					{
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
					},
				);
			}),
		],
	},
};
