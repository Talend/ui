import { Map, List } from 'immutable';

import Container from './AboutDialog.container';
import Connected, { mapStateToProps } from './AboutDialog.connect';
import Constants from './AboutDialog.constant';

describe('Connected AboutDialog', () => {
	it('should connect AboutDialog', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should mapStateToProps with an empty list of products', () => {
		const state = {
			cmf: {
				collections: new Map({
					AboutDialog: {
						[Constants.COLLECTION_ID]: new List(),
					},
				}),
			},
		};
		const ownProps = {};

		const props = mapStateToProps(state, ownProps);

		expect(props).toEqual({});
	});
});
