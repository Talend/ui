import { screen, render } from '@testing-library/react';
import WithDrawer from './WithDrawer.component';
import Drawer from '../Drawer';

describe('WithDrawer', () => {
	it('should render', () => {
		const drawer = <Drawer title="drawerTitle">test</Drawer>;
		const { container } = render(
			<WithDrawer drawers={[drawer]}>
				<div data-testid="Children" />
			</WithDrawer>,
		);
		// transition
		expect(screen.getByRole('dialog').parentElement).toHaveStyle(
			'transition: transform 350ms ease-in-out; transform: translateX(0%);',
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should desactivate transition from Drawer props', () => {
		// note: here we don't use a component because react doesn t create
		// an object with props in real rendering
		let drawer = (
			<Drawer title="drawerTitle" withTransition={false}>
				test
			</Drawer>
		);
		render(
			<WithDrawer drawers={[drawer]}>
				<div data-testid="Children" />
			</WithDrawer>,
		);
		expect(screen.getByRole('dialog').parentElement).toHaveStyle(
			'transition: transform 0ms ease-in-out; transform: translateX(0%);',
		);
	});
});
