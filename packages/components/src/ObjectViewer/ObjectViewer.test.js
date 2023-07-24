import { screen, render } from '@testing-library/react';
import ObjectViewer from './ObjectViewer.component';

jest.unmock('@talend/design-system');

describe('ObjectViewer', () => {
	beforeEach(() => {
		Object.defineProperties(window.HTMLElement.prototype, {
			offsetParent: {
				get() {
					return {
						offsetWith: parseFloat(this.style.width) || 0,
					};
				},
			},
		});
	});
	it('should render Tree by default', () => {
		render(<ObjectViewer id="my-viewer" data={[]} />);
		expect(screen.getByRole('tree')).toBeVisible();
	});
	it('should render List', () => {
		render(<ObjectViewer id="my-viewer" displayMode="list" data={[]} />);
		expect(screen.getByRole('list')).toBeVisible();
	});
	it('should render Tree', () => {
		render(<ObjectViewer id="my-viewer" displayMode="tree" data={[]} />);
		expect(screen.getByRole('tree')).toBeVisible();
	});
	it('should render Table', () => {
		render(<ObjectViewer id="my-viewer" displayMode="table" data={[]} title="my-table" />);
		expect(screen.getByRole('table')).toBeVisible();
	});
	it('should not render when no data', () => {
		render(<ObjectViewer id="my-viewer" displayMode="table" title="my-table" />);
		expect(screen.queryByRole('table')).not.toBeInTheDocument();
	});
	it('should render Tree when no data nor dataSchema values', () => {
		render(
			<ObjectViewer id="my-viewer" displayMode="tree" data={[]} dataSchema={[]} title="my-tree" />,
		);
		expect(screen.getByRole('tree')).toBeVisible();
	});
	it('should not convert date when a type is unknown', () => {
		const data = [{ id: '0019000000PCahjAAD', LastModifiedDate: 1565364308000 }];
		const dataSchema = {
			fields: [
				{
					name: 'LastModifiedDate',
					type: {
						type: 'some-type',
						logicalType: 'time-micros',
						'talend.component.DATETIME': 'true',
					},
				},
			],
		};
		render(
			<ObjectViewer
				id="my-viewer"
				displayMode="tree"
				data={data}
				opened={['$', '$[0]', "$[0]['LastModifiedDate']"]}
				dataSchema={dataSchema}
				title="my-tree"
			/>,
		);
		expect(screen.getByRole('tree')).toBeVisible();
		expect(screen.getByText('LastModifiedDate:')).toBeVisible();
		expect(screen.getByText('1565364308000')).toBeVisible();
	});
	it('should correctely convert date when a type is known', () => {
		const data = [{ id: '0019000000PCahjAAD', LastModifiedDate: 1565364308000 }];
		const dataSchema = {
			fields: [
				{
					name: 'LastModifiedDate',
					type: {
						type: 'long',
						logicalType: 'time-micros',
						'talend.component.DATETIME': 'true',
					},
				},
			],
		};

		const convertedData = new Date(1565364308000).toISOString();
		render(
			<ObjectViewer
				id="my-viewer"
				opened={['$', '$[0]', "$[0]['LastModifiedDate']"]}
				displayMode="tree"
				data={data}
				dataSchema={dataSchema}
				title="my-tree"
			/>,
		);
		expect(screen.getByRole('tree')).toBeVisible();
		expect(screen.getByText('LastModifiedDate:')).toBeVisible();
		expect(screen.getByText(convertedData)).toBeVisible();
	});
});
