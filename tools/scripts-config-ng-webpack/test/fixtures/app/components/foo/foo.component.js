import template from './foo.html';

const Foo = {
	templateUrl: template,
	bindings: {
		text: '@',
	},
};

export default Foo;
