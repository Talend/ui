declare module '*.scss';
declare module '*.png';

declare module '*.css' {
	const contents: Record<string, string>;
	export default contents;
}

declare module '@talend/json-schema-form-core' {
	export function isSafePattern(pattern: string): boolean;
}
