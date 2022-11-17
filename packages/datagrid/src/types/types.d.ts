declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}

declare module '@talend/react-bootstrap';
declare module '@talend/react-components' {
	export * from '@talend/react-components/types';
}
