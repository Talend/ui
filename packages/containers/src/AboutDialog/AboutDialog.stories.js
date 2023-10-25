import { rest } from 'msw';

import Action from '../Action';
import AboutDialog from '.';

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
			rest.get('https://tdp.us.cloud.talend.com/api/version', (req, res, ctx) => {
				return res(
					ctx.json({
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
				);
			}),
		],
	},
};
