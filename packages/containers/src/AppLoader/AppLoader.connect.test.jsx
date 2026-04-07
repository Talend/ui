import Immutable from 'immutable';
import { render, screen } from '@testing-library/react';
import { AppLoaderContainer, mapStateToProps } from './AppLoader.connect';

describe('AppLoader container', () => {
	describe('rendering', () => {
		it('should render child if not loading', () => {
			render(
				<AppLoaderContainer>
					<div data-testid="child" />
				</AppLoaderContainer>,
			);
			expect(screen.getByTestId('child')).toBeVisible();
		});

		it('should render the app loader if loading', () => {
			render(
				<AppLoaderContainer loading>
					<div data-testid="child" />
				</AppLoaderContainer>,
			);
			expect(screen.queryByTestId('child')).not.toBeInTheDocument();
			expect(screen.getByRole('status')).toBeVisible();
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
