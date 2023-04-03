import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { generateDefaultViewId, mapStateToViewProps, WaitForSettings } from '../src/settings';
import { mock } from '../src';

describe('settings', () => {
	describe('mapStateToViewProps', () => {
		it('should apply default props from displayName if no view are passed', () => {
			const state = mock.store.state();
			state.cmf.settings.props.MyComponent = { foo: 'bar' };
			const props = mapStateToViewProps(state, { views: undefined }, 'MyComponent');
			expect(props.foo).toBe('bar');
		});

		it('should apply default props from displayName and componentId if no view are passed', () => {
			const state = mock.store.state();
			state.cmf.settings.props.MyComponent = { foo: 'bar' };
			state.cmf.settings.props['MyComponent#my-component-id'] = { foo: 'baz' };
			const props = mapStateToViewProps(
				state,
				{ view: undefined },
				'MyComponent',
				'my-component-id',
			);
			expect(props.foo).toBe('baz');
		});
		it('should apply default props from displayName and componentId without HOC', () => {
			const state = mock.store.state();
			state.cmf.settings.props.MyComponent = { foo: 'bar' };
			state.cmf.settings.props['MyComponent#my-component-id'] = { foo: 'baz' };
			const props = mapStateToViewProps(
				state,
				{ view: undefined },
				'Translate(Container(MyComponent))',
				'my-component-id',
			);
			expect(props.foo).toBe('baz');
		});
	});

	describe('generateDefaultViewId', () => {
		it('return untouched viewId if properly given', () => {
			const viewId = 'viewId';
			expect(generateDefaultViewId('viewId')).toBe(viewId);
		});

		it('return componentName#componentId if available and viewId i undefined', () => {
			expect(generateDefaultViewId(undefined, 'componentName', 'componentId')).toBe(
				'componentName#componentId',
			);
		});

		it('return componentName if the only given parameter', () => {
			expect(generateDefaultViewId(undefined, 'componentName')).toBe('componentName');
		});

		it('return undefined if all parameter are undefined', () => {
			expect(generateDefaultViewId()).toBe(undefined);
		});

		it('return undefined if only componentId is given (should not be possible)', () => {
			expect(generateDefaultViewId()).toBe(undefined);
		});
	});
	describe('WaitForSettings', () => {
		it('should display using loader if state settings is not initialized', () => {
			const state = mock.store.state();
			render(
				<Provider store={mock.store.store(state)}>
					<WaitForSettings>
						<button>Hello</button>
					</WaitForSettings>
				</Provider>,
			);
			expect(screen.getByText('loading')).toBeInTheDocument();
		});
		it('should display loading using AppLoader', () => {
			const AppLoader = () => <p>custom loader</p>;
			const state = mock.store.state();
			render(
				<Provider store={mock.store.store(state)}>
					<WaitForSettings loading={AppLoader}>
						<button>Hello</button>
					</WaitForSettings>
				</Provider>,
			);
			expect(() => screen.getByRole('button')).toThrow();
			expect(screen.getByText('custom loader')).toBeInTheDocument();
		});
		it('should display children when settings are initialized', () => {
			const state = mock.store.state();
			state.cmf.settings.initialized = true;
			render(
				<Provider store={mock.store.store(state)}>
					<WaitForSettings>Hello</WaitForSettings>
				</Provider>,
			);
			expect(screen.getByText('Hello')).toBeInTheDocument();
			expect(() => screen.getByText('loading')).toThrow();
		});
	});
});
