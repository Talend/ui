import { screen, render } from '@testing-library/react';
import SubHeaderBar from '../SubHeaderBar';

import Layout from './Layout.component';

const header = <h1>Header</h1>;
const subHeader = <SubHeaderBar title="defaultTitle" onGoBack={jest.fn()} />;
const footer = <h3>Footer</h3>;
const one = <h1>Column one</h1>;
const two = <h1>Column two</h1>;
const tabs = {
	id: 'my-tabs',
	items: [
		{
			id: 'tab-bar-action-1',
			key: '1',
			label: 'Tab1',
		},
		{
			id: 'tab-bar-action-2',
			key: '2',
			label: 'Tab2',
		},
		{
			id: 'tab-bar-action-3',
			key: '3',
			label: 'Tab3',
		},
	],
	onSelect: jest.fn(),
	selectedKey: '2',
};
const drawers = [
	<div key="first" style={{ width: 500 }}>
		<h1>Hello drawer one</h1>
		<p>You should not being able to read this because I&#39;m first</p>
	</div>,
	<div key="second" style={{ width: 400 }}>
		<h1>Hello drawer two</h1>
		<p>The content dictate the width</p>
	</div>,
];

describe('Layout', () => {
	it('should render Layout OneColumn', () => {
		render(
			<Layout mode="OneColumn" header={header}>
				{one}
			</Layout>,
		);
		expect(screen.getByText('Header')).toBeVisible();
		expect(screen.getByText('Column one')).toBeVisible();
	});

	it('should render Layout TwoColumns', () => {
		render(
			<Layout mode="TwoColumns" one={one} header={header}>
				{two}
			</Layout>,
		);
		expect(screen.getByText('Column one')).toBeVisible();
		expect(screen.getByText('Column two')).toBeVisible();
	});

	it('should render TwoColumns with drawers props', () => {
		render(
			<Layout mode="TwoColumns" one={one} header={header} drawers={drawers}>
				{two}
			</Layout>,
		);
		expect(screen.getByText('Column one')).toBeVisible();
		expect(screen.getByText('Column two')).toBeVisible();
		expect(screen.getByText('Hello drawer one')).toBeVisible();
		expect(screen.getByText('Hello drawer two')).toBeVisible();
	});

	it('should render layout with footer component', () => {
		render(
			<Layout mode="OneColumn" header={header} footer={footer}>
				{one}
			</Layout>,
		);
		expect(screen.getByText('Footer')).toBeVisible();
	});

	it('should render layout without header', () => {
		render(<Layout mode="OneColumn">{one}</Layout>);
		expect(screen.queryByText('Header')).not.toBeInTheDocument();
	});

	it('should render TwoColumns with tabs props', () => {
		render(
			<Layout mode="TwoColumns" one={one} header={header} tabs={tabs}>
				{two}
			</Layout>,
		);
		expect(screen.getByText('Tab1')).toBeVisible();
		expect(screen.getByText('Tab2')).toBeVisible();
		expect(screen.getByText('Tab3')).toBeVisible();
	});

	it('should render layout with subHeader in OneColumn mode', () => {
		render(
			<Layout subHeader={subHeader} mode="OneColumn">
				{one}
			</Layout>,
		);
		expect(screen.getByText('defaultTitle')).toBeVisible();
	});

	it('should render layout with subHeader in TwoColumns mode', () => {
		render(
			<Layout subHeader={subHeader} mode="TwoColumns">
				{one}
			</Layout>,
		);
		expect(screen.getByText('defaultTitle')).toBeVisible();
		expect(screen.getByText('Column one').closest('.tc-layout-two-columns')).toBeVisible();
	});
});
