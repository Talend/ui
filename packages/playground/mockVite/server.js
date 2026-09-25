import { http, HttpResponse } from 'msw';

import { trigger } from './kit';
import forms from './mock/kit';

const API_MOCK_ENDPOINT = '/api/mock';

const mockModules = import.meta.glob('./mock/**/*.json', {
	eager: true,
	import: 'default',
});
const mockFiles = Object.fromEntries(
	Object.entries(mockModules).map(([filePath, content]) => [
		filePath.replace(/^\.\/mock\//, '').replace(/\.json$/, ''),
		content,
	]),
);

export const handlers = [
	http.post('*/api/v1/forms', async ({ request }) => {
		return HttpResponse.json({
			code: 200,
			data: await request.json(),
		});
	}),
	http.get('*/api/v1/forms/:formId', ({ params }) => {
		const formData = forms[params.formId];
		if (!formData) {
			return HttpResponse.json({ code: 404, message: 'Form not found' });
		}
		return HttpResponse.json(formData);
	}),
	http.post('*/api/v1/application/action', async ({ request }) => {
		const url = new URL(request.url);
		const result = await trigger({
			body: await request.json(),
			query: Object.fromEntries(url.searchParams),
		});
		if (result?.httpStatus) {
			return HttpResponse.json(result.body, { status: result.httpStatus });
		}
		return HttpResponse.json(result);
	}),
	http.get(`*${API_MOCK_ENDPOINT}/*`, ({ request }) => {
		const mockPath = new URL(request.url).pathname.slice(`${API_MOCK_ENDPOINT}/`.length);
		const content = mockFiles[mockPath];
		if (!content) {
			return HttpResponse.json({ code: 400, data: 'Bad Request' });
		}
		return HttpResponse.json(content);
	}),
];

export default handlers;
