import fs from 'fs';
import path from 'path';

import { trigger } from './kit';
import forms from './mock/kit';

const API_MOCK_ENDPOINT = '/api/mock';
export default [
	{
		url: '/api/v1/forms',
		method: 'post',
		response: ({ body }) => {
			return {
				code: 200,
				data: body,
			};
		},
	},
	{
		url: '/api/v1/forms/:formId', // ":formId" est un placeholder pour le paramètre
		method: 'get',
		response: ({ query, params }) => {
			console.log('query', query);
			console.log('params', params);
			if (!query || !query.formId) {
				return { code: 404, message: 'Form not found' };
			}
			const formData = forms[query.formId];
			if (!formData) {
				return { code: 404, message: 'Form not found' };
			}
			return formData;
		},
	},

	{
		url: '/api/v1/application/action',
		method: 'post',
		response: ({ body, response }) => {
			const result = trigger({ body });
			if (typeof result === 'function') {
				result(response);
				return null;
			}
			return result;
		},
	},
	{
		url: `${API_MOCK_ENDPOINT}/:path*`,
		method: 'get',
		response: ({ query }) => {
			const urlPath = `/${query.path.join('/')}`;
			const mockFilePath = path.resolve(__dirname, `./mock/${urlPath}.json`);
			try {
				const content = fs.readFileSync(mockFilePath, 'utf-8');
				return JSON.parse(content);
			} catch (error) {
				console.error(`Unable to load mock file "${mockFilePath}" due to:`, error);
				return {
					code: 400,
					data: 'Bad Request',
				};
			}
		},
	},
];
