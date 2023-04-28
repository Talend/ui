import pluginTester from 'babel-plugin-tester';
import babelPlugin from '.';

pluginTester({
	plugin: babelPlugin,
	pluginName: 'babel-plugin-import-from-index',
	tests: [
		{
			code: `
				import createSagaMiddleware from 'redux-saga';
				import { spawn } from 'redux-saga/effects';
			`,
			output: `
				import createSagaMiddleware from 'redux-saga';
				import { spawn } from 'redux-saga/effects';
			`,
		},
		{
			code: `
		 		import get from 'lodash/get';`,
			output: `
		 		import { get } from 'lodash';`,
		},
		{
			code: `
		 		import _get from 'lodash/get';`,
			output: `
		 		import { get as _get } from 'lodash';`,
		},
		{
			code: `
				import _ from 'lodash';
				_.toUpper('foo');`,
			output: `
				import _ from 'lodash';
				_.toUpper('foo');`,
		},
		{
			code: `
                 import React from 'react';
                 import { SidePanel } from '@talend/react-components';
                 import { Actions, ActionButton, ActionDropdown } from '@talend/react-components';
                 import List from '@talend/react-components/lib/List';`,
			output: `
                 import React from 'react';
                 import { SidePanel, Actions, ActionButton, ActionDropdown, List } from '@talend/react-components';`,
		},
		{
			code: "import React from 'react';",
			output: "import React from 'react';",
		},
		{
			code: `
		 		import React from 'react';
				import { SidePanel } from '@talend/react-components';
		 		import { ModelViewer as ModelViewerComponent } from '@talend/react-components';`,
			output: `
		 		import React from 'react';
		 		import { SidePanel, ModelViewer as ModelViewerComponent } from '@talend/react-components';`,
		},
		{
			code: "import { RecordsViewer as RecordsViewerComponent, TooltipTrigger } from '@talend/react-components';",
			output:
				"import { RecordsViewer as RecordsViewerComponent, TooltipTrigger } from '@talend/react-components';",
		},
		{
			code: "import * as allComponents from '@talend/react-components';",
			output: "import * as allComponents from '@talend/react-components';",
		},
		{
			code: "import * as allComponents from '@talend/react-components';",
			output: "import * as allComponents from '@talend/react-components';",
		},
		{
			code: "import DatalistComponent from '@talend/react-components/lib/Datalist';",
			output: "import { Datalist as DatalistComponent } from '@talend/react-components';",
		},
		{
			code: "import ResourcePickerComponent from '@talend/react-components/lib/ResourcePicker';",
			output:
				"import { ResourcePicker as ResourcePickerComponent } from '@talend/react-components';",
		},
		{
			code: "import Foo from '@talend/react-components/lib/Bar/Foo';",
			output: "import Foo from '@talend/react-components/lib/Bar/Foo';",
		},
		{
			code: "import cmfContainer, { AppLoader } from '@talend/react-containers';",
			output: "import cmfContainer, { AppLoader } from '@talend/react-containers';",
		},
		{
			code: "import SagaTester from 'redux-saga-tester';",
			output: "import SagaTester from 'redux-saga-tester';",
		},
	],
});
