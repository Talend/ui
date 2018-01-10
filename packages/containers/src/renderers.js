import { api } from '@talend/react-cmf';

export default function getRenderers(fromImports) {
	const renderers = Object.assign({}, fromImports);
	Object.keys(renderers).forEach(key => {
		if (api.component.has(key)) {
			const component = api.component.get(key);
			if (component && renderers[key] && renderers[key] !== component) {
				renderers[key] = component;
			}
		}
	});
	return renderers;
}
