export default {
	plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'react', 'jsx-a11y', 'import', 'vitest'],
	env: {
		browser: true,
		node: true,
		es2026: true,
	},
	settings: {
		react: {
			version: '18',
		},
	},
	ignorePatterns: [
		'lib/**',
		'lib-esm/**',
		'dist/**',
		'coverage/**',
		'storybook-static/**',
		'**/*.d.ts',
	],
	overrides: [
		{
			files: ['*.test.ts', '*.test.tsx', '*.spec.ts', '*.spec.tsx'],
			rules: {
				'typescript/no-explicit-any': 'off',
			},
		},
	],
};
