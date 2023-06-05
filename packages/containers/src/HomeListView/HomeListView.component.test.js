// rewrite tests using react-testing-library
import { screen, render } from '@testing-library/react';
// eslint-disable-next-line @talend/import-depth
import { prepareCMF } from '@talend/react-cmf/lib/mock/rtl';

import Component from './HomeListView.component';

jest.unmock('@talend/design-system');

const cmfModule = {
	id: 'test-me',
	render: false,
	components: {
		List: () => <div data-testid="List">List</div>,
		HeaderBar: () => <div data-testid="HeaderBar">HeaderBar</div>,
		SidePanel: () => <div data-testid="SidePanel">SidePanel</div>,
	},
	preloadedState: {
		cmf: {
			settings: {
				actions: {
					'menu:article': {
						label: 'Article',
						icon: 'talend-file-xls-o',
					},
				},
				props: {},
			},
		},
	},
};

describe('Component HomeListView', () => {
	it('should be able to render theme t7', async () => {
		const { container } = render(
			await prepareCMF(
				<Component
					hasTheme
					header={<div>hello app</div>}
					sidepanel={<div>hello sidepanel</div>}
					list={<div>hello list</div>}
				>
					<h1>Hello children</h1>
				</Component>,
				{ cmfModule },
			),
		);
		expect(container.firstChild).toHaveClass('t7');
	});

	it('should render with element props', async () => {
		render(
			await prepareCMF(
				<Component
					header={<div data-testid="testheader">hello app</div>}
					sidepanel={<div data-testid="testsidepanel"> hello sidepanel</div>}
					list={<div data-testid="testlist">hello list</div>}
				>
					<h1>Hello children</h1>
				</Component>,
				{ cmfModule },
			),
		);
		expect(screen.getByTestId('testheader')).toBeInTheDocument();
		expect(screen.getByTestId('testsidepanel')).toBeInTheDocument();
		expect(screen.getByTestId('testlist')).toBeInTheDocument();
	});

	it('should children transformed as array in props.drawers', async () => {
		const children = {
			props: {
				foo: 'bar',
				children: {
					props: {
						label: 'foo',
						children: {
							props: {
								children: null,
							},
						},
					},
				},
			},
		};
		render(
			await prepareCMF(
				<Component
					header={<div data-testid="testheader">hello app</div>}
					sidepanel={<div data-testid="testsidepanel"> hello sidepanel</div>}
					list={<div data-testid="testlist">hello list</div>}
				>
					{children}
				</Component>,
				{ cmfModule },
			),
		);
		expect(document.querySelectorAll('.tc-with-drawer-wrapper')).toHaveLength(3);
	});
	it('should Inject components.drawer into props.drawers', async () => {
		const components = {
			drawers: [{ component: 'Foo' }],
		};
		const getComponent = jest.fn(() => () => 'hello drawer');
		render(
			await prepareCMF(
				<Component
					header={<div data-testid="testheader">hello app</div>}
					sidepanel={<div data-testid="testsidepanel"> hello sidepanel</div>}
					list={<div data-testid="testlist">hello list</div>}
					components={components}
					getComponent={getComponent}
				/>,
				{ cmfModule },
			),
		);
		expect(getComponent).toHaveBeenCalledWith('Foo');
		expect(screen.getByText('hello drawer')).toHaveClass('tc-with-drawer-wrapper');
	});
});
