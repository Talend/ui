import { extractInfo } from './extract.js';

export const info = extractInfo('./svg');
export const infoFromFigma = extractInfo('./icon');

export default {
	info,
	infoFromFigma,
};
