// https://getbootstrap.com/docs/3.3/css/
const BOOTSTRAP_CLASS = [
	// status
	'disabled',
	'active',
	'success',
	'warning',
	'danger',
	'info',
	'blockquote-reverse',
	// background
	'bg-primary',
	'bg-success',
	'bg-info',
	'bg-warning',
	'bg-danger',
	// btn
	'btn',
	'btn-primary',
	'btn-default',
	'btn-success',
	'btn-info',
	'btn-warning',
	'btn-danger',
	'btn-link',
	'btn-lg',
	'btn-sm',
	'btn-xs',
	'btn-block',
	'btn-inverse',

	'caret',
	'pull-left',
	'pull-right',
	'clearfix',
	'show',
	'hide',
	'sr-only',

	// grid
	'container',
	'row',

	// forms
	'checkbox',
	'control-label',
	'form-inline',
	'form-group',
	'form-control',
	'help-block',
	'input-group',
	'input-group-addon',

	//navbar
	'nav',
	'navbar-left',
	'navbar-right',
	'navbar-text',
	'navbar-btn',
	'navbar-form',
	'navbar-link',

	//list
	'list-unstyled',
	'list-inline',
	'dl-horizontal',

	//table
	'table',
	'table-condensed',
	'table-hover',
	'table-striped',
	//text
	'text-muted',
	'text-primary',
	'text-sucess',
	'text-info',
	'text-warning',
	'text-danger',
	'text-hide',

	//responsive
	'hidden-xs',
	'hidden-sm',
	'hidden-md',
	'hidden-lg',
];

const message = 'bootstrap 3 class are deprecated';

module.exports = {
	meta: {
		docs: {
			description: 'Check if any bootstrap class is used inside a className call',
			category: 'Build',
			recommended: false,
		},
		fixable: null,
		schema: {},
		messages: {
			useBootstrapClass: "'{{className}}' should not be used",
		},
	},

	create: function create(context) {
		let classNameName;
		return {
			ImportDeclaration: function (node) {
				if (node.source.value === 'classnames') {
					const spec = node.specifiers.find(s => s.type === 'ImportDefaultSpecifier');
					if (spec) {
						classNameName = spec.local.name;
					}
				}
			},
			CallExpression: function (node) {
				if (!classNameName) {
					return;
				}
				if (node.callee?.name === classNameName) {
					node.arguments.forEach(value => {
						if (value.type === 'Literal') {
							const values = value.value.split(' ');
							if (values.some(v => BOOTSTRAP_CLASS.includes(v))) {
								context.report({
									node: value,
									message,
								});
							}
						} else if (value.type === 'ObjectExpression') {
							value.properties.forEach(props => {
								if (BOOTSTRAP_CLASS.includes(props.key?.value)) {
									context.report({
										node: props.key,
										message,
									});
								}
							});
						}
					});
				}
			},
			JSXAttribute: function (node) {
				if (node.value?.type === 'Literal') {
					const values = node.value.value.split(' ');
					if (values.some(v => BOOTSTRAP_CLASS.includes(v))) {
						context.report({
							node,
							message,
						});
					}
				}
			},
		};
	},
};
