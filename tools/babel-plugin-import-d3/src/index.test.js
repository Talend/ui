import pluginTester from 'babel-plugin-tester';
import babelPlugin from '.';

pluginTester({
	plugin: babelPlugin,
	pluginName: 'babel-plugin-import-d3',
	tests: [
		{
			code: `
				import get from 'lodash/get';
				import { select, event } from 'd3-selection';
				import shape from 'd3-shape';
				import { scale as foo } from 'd3-scale';
				import { brush } from 'd3';
				import { csv } from 'd3-fetch'`,
			output: `
				import get from 'lodash/get';
				import { brush } from 'd3';
				import { select, event, shape, scale as foo, csv } from 'd3';`,
		},
		// should work in already compiled project
		{
			code: `
				const { select, event } = require('d3-selection');
				const shape = require('d3-shape');
				const { scaleBand } = require('d3-scale');
				const { csv } = require('d3-fetch');`,
			output: `
				const { select, event } = require('d3').selection;

				const shape = require('d3').shape;

				const { scaleBand } = require('d3').scale;

				const { csv } = require('d3').fetch;`,
		}
	],
});
