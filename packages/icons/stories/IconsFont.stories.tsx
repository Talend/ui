import '../dist/talend-icons-webfont.css';
import { info as icons } from '../dist/info';

function I({ className }: { className: string }) {
	return <i className={className}></i>;
}

export default {
	title: 'Icons font',
	parameters: {},
	component: I,
};

export const Usage = {
	args: {
		className: 'icon icon-box',
	},
	argTypes: {
		className: {
			options: Object.keys(icons).map(i => `icon icon-${i.replace('talend-', '')}`),
			control: {
				type: 'select',
			},
		},
	},
};
