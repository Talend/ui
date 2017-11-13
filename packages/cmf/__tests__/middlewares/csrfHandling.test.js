import { mergeCSRFToken } from '../../src/middlewares/http/csrfHandling';

describe('csrf token injection', () => {
	beforeEach(() => {
		delete document.cookie;
	});

	it('if a csrf token is availble on a cookie, inject it as HTTP_X_CSRFTOKEN headers', () => {
		document.cookie =
			'csrfToken=hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x; dwf_section_edit=True; dwf_sg_task_completion=False; _ga=GA1.2.973892348.1500561092; _gid=GA1.2.95155632.1510232958';
		expect(
			mergeCSRFToken(
				{},
				{
					headers: { stuff: 'stuff' },
				},
			),
		).toEqual({
			headers: { 'X-CSRF-Token': 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x', stuff: 'stuff' },
		});
	});

	it('if a csrf token is not available on a cookie, do not touch headers', () => {
		expect(
			mergeCSRFToken(
				{},
				{
					headers: { stuff: 'stuff' },
				},
			),
		).toEqual({ headers: { stuff: 'stuff' } });
	});
});
