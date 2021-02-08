declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}

declare module '@talend/react-components'; // TODO check me
declare module '@talend/react-components/*';
