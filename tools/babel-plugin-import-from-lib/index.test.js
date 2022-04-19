const pluginTester = require('babel-plugin-tester').default;
const babelPlugin = require('.');

pluginTester({
	plugin: babelPlugin,
	pluginName: '@talend/babel-plugin-import-from-lib',
	title: 'default',
	tests: [
		{
			code: `
			import { SidePanel, Actions, ActionButton, ActionDropdown, List } from '@talend/react-components';`,
		output: `
			import List from '@talend/react-components/lib/List';
			import { ActionDropdown } from '@talend/react-components/lib/Actions';
			import { ActionButton } from '@talend/react-components/lib/Actions';
			import { Actions } from '@talend/react-components/lib/Actions';
			import SidePanel from '@talend/react-components/lib/SidePanel';`
		},
		{
			code: "import { SidePanel as Component } from '@talend/react-components';",
			output: "import Component from '@talend/react-components/lib/SidePanel';"
		},
		{
			code: "import { Actions as Component } from '@talend/react-components';",
			output: "import { Actions as Component } from '@talend/react-components/lib/Actions';"
		},
		{
			// do not change existing /lib
			code: "import getLocale from '@talend/react-components/lib/DateFnsLocale/locale';",
			output: "import getLocale from '@talend/react-components/lib/DateFnsLocale/locale';"
		},
		{
			code: "import React from 'react';",
			output: "import React from 'react';",
		},
		{
			code: "import {get} from 'lodash';",
			output: "import get from 'lodash/get';",
		},
		{
			code: "import { get as _get } from 'lodash';",
			output: "import _get from 'lodash/get';",
		},
		{
			code: "import { subHours } from 'date-fns';",
			output: "import subHours from 'date-fns/subHours';",
		},
		{
			code: "import { subHours as get } from 'date-fns';",
			output: "import get from 'date-fns/subHours';",
		},
	],
});
pluginTester({
	plugin: babelPlugin,
	pluginName: '@talend/babel-plugin-import-from-lib',
	title: 'options',
	pluginOptions: {
		rules: {
			'@material-ui/core': {}
		}
	},
	tests: [
		{
			code: "import { Button } from '@material-ui/core';",
			output: "import Button from '@material-ui/core/Button';",
		}
	]
});