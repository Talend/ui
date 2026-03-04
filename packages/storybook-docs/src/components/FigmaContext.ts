import { createContext } from 'react';
import type { GetImagesResponse } from '@figma/rest-api-spec';

const token = process.env.STORYBOOK_FIGMA_ACCESS_TOKEN;
const FIGMA_API_BASE = 'https://api.figma.com/v1';

interface FileImagesParams {
	ids: string[];
	scale?: number;
	format?: 'jpg' | 'png' | 'svg' | 'pdf';
	svg_include_id?: boolean;
	svg_simplify_stroke?: boolean;
	use_absolute_bounds?: boolean;
	version?: string;
}

interface FigmaClient {
	isConfigured: boolean;
	fileImages: (fileKey: string, params: FileImagesParams) => Promise<{ data: GetImagesResponse }>;
}

function createFigmaClient(personalAccessToken?: string): FigmaClient {
	return {
		isConfigured: !!personalAccessToken,
		fileImages: async (fileKey: string, params: FileImagesParams) => {
			const url = new URL(`${FIGMA_API_BASE}/images/${fileKey}`);
			if (params.ids?.length) {
				url.searchParams.set('ids', params.ids.join(','));
			}
			if (params.scale !== undefined) {
				url.searchParams.set('scale', String(params.scale));
			}
			if (params.format) {
				url.searchParams.set('format', params.format);
			}
			if (params.version) {
				url.searchParams.set('version', params.version);
			}
			const response = await fetch(url.toString(), {
				headers: {
					'X-Figma-Token': personalAccessToken || '',
				},
			});
			if (!response.ok) {
				throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
			}
			const data: GetImagesResponse = await response.json();
			return { data };
		},
	};
}

export const FigmaContext = createContext<FigmaClient>(createFigmaClient(token));

export default FigmaContext;
