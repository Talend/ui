import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import AppLoader from '@talend/react-components/lib/AppLoader';
import { AppLoaderContainer, mapStateToProps } from './AppLoader.connect';

describe('AppLoader container', () => {
	describe('rendering', () => {
		it('should render child if not loading', () => {
			const wrapper = shallow(
				<AppLoaderContainer>
					<div className="child" />
				</AppLoaderContainer>,
			);
			expect(wrapper.find('.child').length).toBe(1);
		});

		it('should render the app loader if loading', () => {
			const wrapper = shallow(
				<AppLoaderContainer loading>
					<div className="child" />
				</AppLoaderContainer>,
			);
			expect(wrapper.find('.child').length).toBe(0);
			expect(wrapper.getElement()).toEqual(<AppLoader />);
		});
	});

	describe('mapStateToProps', () => {
		it('should return loading to false if we have nothing to wait', () => {
			// given
			const state = { cmf: { collections: Immutable.Map() } };
			const ownProps = {};
			// when
			const result = mapStateToProps(state, ownProps);
			// then
			expect(result).toEqual({ loading: false });
		});

		it('should return loading to true if there is something to wait', () => {
			// given
			const state = { cmf: { collections: Immutable.Map({ test2: Immutable.Map() }) } };
			const ownProps = { hasCollections: ['test', 'test2'] };
			// when
			const result = mapStateToProps(state, ownProps);
			// then
			expect(result).toEqual({ loading: true });
		});

		it('should return loading to false if everything to wait is present in collections', () => {
			// given
			const state = {
				cmf: {
					collections: Immutable.Map({ test2: Immutable.Map(), test: Immutable.Map() }),
				},
			};
			const ownProps = { hasCollections: ['test', 'test2'] };
			// when
			const result = mapStateToProps(state, ownProps);
			// then
			expect(result).toEqual({ loading: false });
		});
	});
});
