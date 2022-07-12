import Foo from './foo.component';
import angular from 'angular';

const MODULE_NAME = 'myApp.foo';

angular.module(MODULE_NAME, []).component('foo', Foo);

export default MODULE_NAME;
