import extractFiles, { extractInfo } from './extract.js';

export const svgs = extractFiles('./svg');
export const icons = extractFiles('./icon');
export const filters = extractFiles('./filters');

export const info = extractInfo('./svg');
export const infoFromFigma = extractInfo('./icon');

export default {
	svgs,
	icons,
	filters,
	info,
	infoFromFigma,
};
