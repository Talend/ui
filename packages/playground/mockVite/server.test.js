import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from './server';

const server = setupServer(...handlers);
const apiUrl = path => `http://localhost${path}`;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('playground mock handlers', () => {
	it('returns form definitions and the existing not-found payload', async () => {
		const response = await fetch(apiUrl('/api/v1/forms/example'));
		const definition = await response.json();
		expect(definition.metadata.id).toBe('example');

		const missingResponse = await fetch(apiUrl('/api/v1/forms/missing'));
		expect(missingResponse.status).toBe(200);
		expect(await missingResponse.json()).toEqual({ code: 404, message: 'Form not found' });
	});

	it('echoes submitted form data', async () => {
		const data = { example: { code: 'print("hello")' } };
		const response = await fetch(apiUrl('/api/v1/forms'), {
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});

		expect(await response.json()).toEqual({ code: 200, data });
	});

	it('serves generic JSON fixtures and the existing bad-request payload', async () => {
		const response = await fetch(apiUrl('/api/mock/header-bar/products-list'));
		const products = await response.json();
		expect(products[0]).toMatchObject({ id: 'TMC', name: 'Management Console' });

		const missingResponse = await fetch(apiUrl('/api/mock/missing'));
		expect(missingResponse.status).toBe(200);
		expect(await missingResponse.json()).toEqual({ code: 400, data: 'Bad Request' });
	});

	it('dispatches trigger metadata from the query and arguments from the body', async () => {
		const response = await fetch(
			apiUrl('/api/v1/application/action?type=healthcheck&action=basicAuth'),
			{
				body: JSON.stringify({
					'basicAuth.password': 'talend',
					'basicAuth.url': 'https://example.com',
					'basicAuth.username': 'talend',
				}),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			},
		);

		expect(await response.json()).toEqual({
			comment: 'Yes username === password',
			status: 'OK',
		});
	});

	it('returns the intended HTTP 500 trigger response', async () => {
		const response = await fetch(
			apiUrl('/api/v1/application/action?type=error&action=giveMeFive'),
			{
				body: '{}',
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			},
		);

		expect(response.status).toBe(500);
		expect(await response.json()).toMatchObject({
			error: 'Internal Server Error',
			status: 500,
		});
	});

	it('maps the remote photo response to large suggestions', async () => {
		server.use(
			http.get('https://jsonplaceholder.typicode.com/photos', () =>
				HttpResponse.json([{ id: 42, title: 'A suggestion' }]),
			),
		);
		const response = await fetch(
			apiUrl('/api/v1/application/action?type=suggestions&action=suggestionBig'),
			{
				body: '{}',
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			},
		);

		expect(await response.json()).toEqual({
			cacheable: true,
			items: [{ id: '42', label: 'A suggestion' }],
		});
	});
});
