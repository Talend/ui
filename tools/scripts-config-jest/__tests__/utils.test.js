import { applyBabelTransformOn } from '../utils';

describe('utilities', () => {
	describe('applyBabelTransformOn', () => {
		it('should add babel transform directive', () => {
			const config = {
				transformIgnorePatterns: ['node_modules/(?!(?:.pnpm/)?(d3|internmap))'],
			};
			applyBabelTransformOn(config, ['dexie']);
			expect(config.transformIgnorePatterns[0]).toBe(
				'node_modules/(?!(?:.pnpm/)?(d3|internmap|dexie))',
			);
		});
	});
});
