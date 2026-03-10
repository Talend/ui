import Container from './AboutDialog.container';

/**
 * cmf.selectors.collections.toJS calls getIn([COLLECTION_ID]) and then .toJS() on the result.
 * Returning the default value (undefined) causes `{...undefined} = {}`, matching the test expectation.
 */
const makeCollections = () => ({ getIn: (_keys, def) => def });
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
				collections: makeCollections(),
			},
		};
		const ownProps = {};

		const props = mapStateToProps(state, ownProps);

		expect(props).toEqual({});
	});
});
