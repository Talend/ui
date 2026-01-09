declare module '*.scss';
declare module '*.png';

declare module '*.css' {
	const contents: Record<string, string>;
	export default contents;
}
