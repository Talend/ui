import { vi } from 'vitest';

type FetchMock = ReturnType<typeof vi.fn> & {
	mockResponse?: Response;
};

const fetchMock = vi.fn(async (_, config?: { response?: Response }) => {
	if (config?.response) {
		return config.response;
	}
	if (fetchMock.mockResponse) {
		const response = fetchMock.mockResponse;
		delete fetchMock.mockResponse;
		return response;
	}
	return undefined;
}) as FetchMock;

globalThis.self.fetch = fetchMock;
