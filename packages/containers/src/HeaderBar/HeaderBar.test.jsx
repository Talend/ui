import { Map, List } from 'immutable';
import { render, screen } from '@testing-library/react';

// eslint-disable-next-line @talend/import-depth
import { prepareCMF } from '@talend/react-cmf/lib/mock/rtl';
import Container, { DEFAULT_STATE } from './HeaderBar.container';
import Connected, { mapStateToProps } from './HeaderBar.connect';
import Constants from './HeaderBar.constant';

describe('Container HeaderBar', () => {
	const state = DEFAULT_STATE;
	const dispatch = jest.fn();
	const containerProps = { state, dispatch };

	it('should render HeaderBar container', async () => {
		render(await prepareCMF(<Container {...containerProps} />));
		expect(screen.getByRole('navigation')).toBeVisible();
	});

	it('should render HeaderBar container with a list of items', async () => {
		const props = {
			...containerProps,
			productsItems: [
				{
					id: 'foo',
					icon: 'icon',
					name: 'Foo',
					url: 'http://foo.bar',
				},
			],
			state: new Map({
				productsFetchState: Constants.FETCH_PRODUCTS_SUCCESS,
			}),
		};

		render(await prepareCMF(<Container {...props} />));
		expect(screen.getByRole('navigation')).toBeVisible();
		expect(screen.getByText('Foo')).toBeVisible();
	});

	it('should merge static products entries with fetched products and sort them by label', async () => {
		const props = {
			...containerProps,
			productsItems: [
				{
					id: 'foo',
					icon: 'icon',
					name: 'Foo',
					url: 'http://foo.bar',
				},
			],
			products: {
				items: [
					{
						id: 'bar',
						icon: 'icon',
						label: 'Bar',
						url: 'http://bar.baz',
					},
					{
						id: 'zeta',
						icon: 'icon',
						label: 'Zeta',
						url: 'http://zeta.com',
					},
				],
			},
			state: new Map({
				productsFetchState: Constants.FETCH_PRODUCTS_SUCCESS,
			}),
		};
		render(await prepareCMF(<Container {...props} />));
		expect(screen.getAllByRole('menuitem')).toHaveLength(3);
		expect(screen.getByText('Bar')).toBeVisible();
		expect(screen.getByText('Foo')).toBeVisible();
		expect(screen.getByText('Zeta')).toBeVisible();
	});

	it('should use the provided prepare method to make a final preparation of the items', async () => {
		const props = {
			...containerProps,
			productsItems: [
				{
					id: 'foo',
					icon: 'icon',
					name: 'Foo',
					url: 'http://foo.bar',
				},
			],
			prepareProducts: jest.fn(products =>
				products.map(product => ({ ...product, label: `${product.label} and bar` })),
			),
			state: new Map({
				productsFetchState: Constants.FETCH_PRODUCTS_SUCCESS,
			}),
		};

		render(<Container {...props} />);
		expect(screen.getByText('Foo and bar')).toBeVisible();
		expect(props.prepareProducts).toHaveBeenCalled();
	});

	it('should render HeaderBar container while fetching items', async () => {
		const props = {
			...containerProps,
			state: new Map({
				productsFetchState: Constants.FETCHING_PRODUCTS,
			}),
		};

		render(await prepareCMF(<Container {...props} />));
		expect(screen.getByRole('navigation')).toBeVisible();
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryAllByRole('menuitem')).toHaveLength(0);
	});
});

describe('Connected HeaderBar', () => {
	it('should connect HeaderBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should mapStateToProps with an empty list of products', () => {
		const state = {
			cmf: {
				collections: new Map({
					HeaderBar: {
						[Constants.COLLECTION_ID]: new List(),
					},
				}),
			},
		};
		const ownProps = {};

		const props = mapStateToProps(state, ownProps);

		expect(props).toEqual({
			callToAction: undefined,
			genericAction: undefined,
			productsItems: undefined,
		});
	});

	it('should mapStateToProps with a list of products', () => {
		const apps = [{ url: 'foobar' }];
		const state = {
			cmf: {
				collections: new Map({
					[Constants.COLLECTION_ID]: new List(apps),
				}),
			},
		};
		const ownProps = {};

		const { productsItems } = mapStateToProps(state, ownProps);

		expect(productsItems.length).toEqual(apps.length);
	});
});
