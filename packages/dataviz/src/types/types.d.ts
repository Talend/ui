declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
}

// FIXME: add the needed types to react-components to remove this
declare module '@talend/react-components';
