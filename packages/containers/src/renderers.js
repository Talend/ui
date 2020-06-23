import cmf from '@talend/react-cmf';

export default function getRenderers(fromImports) {
	const renderers = { ...fromImports };
	Object.keys(renderers).forEach(key => {
		if (cmf.component.has(key)) {
			const component = cmf.component.get(key);
			if (component && renderers[key] && renderers[key] !== component) {
				renderers[key] = component;
			}
		}
	});
	return renderers;
}
