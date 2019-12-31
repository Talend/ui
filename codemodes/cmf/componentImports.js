/* eslint-disable no-param-reassign */

const inBootstrap = [
	'Alert',
	'Breadcrumb',
	'BreadcrumbItem',
	'Button',
	'ButtonGroup',
	'ButtonToolbar',
	'Carousel',
	'CarouselItem',
	'Clearfix',
	'ControlLabel',
	'Col',
	'Collapse',
	'Dropdown',
	'DropdownButton',
	'Fade',
	'Form',
	'FormControl',
	'FormGroup',
	'Glyphicon',
	'Grid',
	'HelpBlock',
	'InputGroup',
	'Jumbotron',
	'Label',
	'ListGroup',
	'ListGroupItem',
	'Media',
	'MenuItem',
	'Modal',
	'ModalBody',
	'ModalFooter',
	'ModalHeader',
	'ModalTitle',
	'Nav',
	'Navbar',
	'NavbarBrand',
	'NavDropdown',
	'NavItem',
	'Overlay',
	'OverlayTrigger',
	'PageHeader',
	'PageItem',
	'Pager',
	'Pagination',
	'Panel',
	'PanelGroup',
	'Popover',
	'ProgressBar',
	'Radio',
	'ResponsiveEmbed',
	'Row',
	'SafeAnchor',
	'SplitButton',
	'Tab',
	'TabContainer',
	'TabContent',
	'TabPane',
	'Tabs',
	'Thumbnail',
	'Tooltip',
	'Well',
];

function getPath(name, root) {
	const base = `${root}/lib`;
	if (root === '@talend/react-components') {
		switch (name) {
			case 'Action':
				return `${base}/Actions/Action`;
			case 'Actions':
				return `${base}/Actions/Actions.component`;
			case 'ActionButton':
				return `${base}/Actions/ActionButton`;
			case 'ActionDropdown':
				return `${base}/Actions/ActionDropdown`;
			case 'ActionFile':
				return `${base}/Actions/ActionFile`;
			case 'ActionIconToggle':
				return `${base}/Actions/ActionIconToggle`;
			case 'ActionSplitDropdown':
				return `${base}/Actions/ActionSplitDropdown`;
			case 'RichLayout':
				return `${base}/RichTooltip/RichLayout`;
			case 'RichError':
				return `${base}/RichTooltip/RichError`;
			case 'Checkbox':
				return `${base}/Toggle/Checkbox.component`;
			case 'CIRCULAR_PROGRESS_SIZE':
				return `${base}/constants`;
			case 'I18N_DOMAIN_COMPONENTS':
				return `${base}/constants`;
			// translated bootstrap
			case 'BootstrapBadge':
				return 'react-bootstrap/lib/Badge';
			case 'BootstrapCheckbox':
				return 'react-bootstrap/lib/Checkbox';
			case 'BootstrapTable':
				return 'react-bootstrap/lib/Table';
			default:
				break;
		}
	}

	if (inBootstrap.indexOf(name) !== -1) {
		return `react-bootstrap/lib/${name}`;
	}
	return `${base}/${name}`;
}

/**
 * import { SidePanel } from '@talend/react-components';
 * ->
 * import SidePanel from '@talend/react-components/lib/SidePanel';
 * With multiple support
 * import { SidePanel, HeaderBar } from '@talend/react-components';
 * ->
 * import SidePanel from '@talend/react-components/lib/SidePanel';
 * import HeaderBar from '@talend/react-components/lib/HeaderBar';
 */

function updateImport(j, root, base) {
	const componentsImport = root.find(j.ImportDeclaration, {
		source: { value: base },
	});
	componentsImport.forEach(i => {
		const nbSpec = i.value.specifiers.length;
		let name;
		i.value.specifiers.forEach((spec, index) => {
			if (spec.type !== 'ImportDefaultSpecifier') {
				if (index + 1 === nbSpec) {
					// is last so we replace
					// spec.imported.name = getPath(spec.imported.name);
					i.value.specifiers = [j.importDefaultSpecifier(j.identifier(spec.local.name))];
					name = getPath(spec.imported.name, base);
				} else {
					// lets add it
					const source = j.literal(getPath(spec.imported.name, base));
					const specifier = j.importDefaultSpecifier(j.identifier(spec.local.name));
					const imp = j.importDeclaration([specifier], source);
					componentsImport.insertAfter(imp);
				}
			}
		});
		if (name) {
			i.value.source = j.literal(name);
		}
	});
}


module.exports = function transform(fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	updateImport(j, root, '@talend/react-components');
	updateImport(j, root, '@talend/react-containers');
	return root.toSource({ useTabs: true, quote: 'single', trailingComma: true });
};
