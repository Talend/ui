import { fromJS } from 'immutable';
import actionCreators from './actionCreators';
import components from './components';
import expressions from './expressions';
import reducer from './reducers';
import settings from './settings';

const cmfModule = {
	id: 'sb-module',
	actionCreators,
	components,
	expressions,
	reducer,
	preloadedState: {
		cmf: {
			collections: fromJS({
				with: {
					data: [
						{
							id: 1,
							label: 'foo',
							children: [
								{
									id: 11,
									label: 'sub foo',
									author: 'Jacques',
									created: '10/12/2013',
									modified: '13/02/2015',
									children: [
										{
											id: 111,
											label: 'sub sub foo',
											author: 'Jacques',
											created: '10/12/2013',
											modified: '13/02/2015',
										},
										{
											id: 112,
											label: 'sub sub foo bar',
											author: 'Jacques',
											created: '10/12/2013',
											modified: '13/02/2015',
										},
									],
								},
							],
						},
						{
							id: 2,
							label: 'bar',
							children: [
								{
									id: 21,
									label: 'sub bar',
									author: 'Paul',
									created: '10/12/2013',
									modified: '13/02/2015',
								},
							],
						},
						{
							id: 3,
							label: 'baz',
							children: [
								{
									id: 31,
									label: 'sub baz',
									author: 'Boris',
									created: '10/12/2013',
									modified: '13/02/2015',
								},
							],
						},
						{
							id: 4,
							label: 'extra',
							children: [
								{
									id: 41,
									label: 'sub extra',
									children: [
										{
											id: 411,
											label: 'third level',
											author: 'Henri',
											created: '10/12/2013',
											modified: '13/02/2015',
										},
									],
								},
							],
						},
						{
							id: 5,
							label: 'look at me',
							author: 'David',
							created: '10/12/2013',
							modified: '13/02/2015',
						},
						{
							id: 6,
							label: 'I am famous',
							author: 'David',
							created: '10/12/2013',
							modified: '13/02/2015',
						},
						{
							id: 7,
							label: 'Strange test',
							author: 'David',
							created: '10/12/2013',
							modified: '13/02/2015',
						},
						{
							id: 8,
							label: 'Do you see me ?',
							author: 'David',
							created: '10/12/2013',
							modified: '13/02/2015',
						},
					],
				},
			}),
		},
	},
};

export { settings };
export default cmfModule;
