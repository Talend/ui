import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import AboutDialog from './AboutDialog.component';

describe('AboutDialog', () => {
	it('should render logo, version, and copyright', () => {
		// when
		render(<AboutDialog show version="Summer 18" icon="talend-tdp-colored" onToggle={jest.fn()} />);

		// then
		const svgIcon = screen.getByTestId('icon');
		expect(svgIcon).toBeInTheDocument();
		expect(svgIcon).toHaveAttribute('name', 'talend-tdp-colored');

		expect(screen.getByText('Version: Summer 18')).toBeInTheDocument();
		expect(
			screen.getByText(`© ${new Date().getFullYear()} Talend. All rights reserved.`),
		).toBeInTheDocument();
	});

	it('should render body with collapsed table', () => {
		// when
		render(
			<AboutDialog
				show
				version="Summer 18"
				icon="talend-tdp-colored"
				onToggle={jest.fn()}
				services={['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
					version: '2.8.0-SNAPSHOT',
					build: '87d0dcd-12e0d6f',
					name,
				}))}
			/>,
		);

		// then
		const moreBtn = screen.getByLabelText('More');
		expect(moreBtn).toBeInTheDocument();

		expect(screen.queryByText('API')).not.toBeInTheDocument();
		expect(screen.queryByText('Dataset')).not.toBeInTheDocument();
		expect(screen.queryByText('Preparation')).not.toBeInTheDocument();
		expect(screen.queryByText('Transformation')).not.toBeInTheDocument();
	});

	it('should render body with expanded table', () => {
		// when
		render(
			<AboutDialog
				show
				expanded
				version="Summer 18"
				icon="talend-tdp-colored"
				onToggle={jest.fn()}
				services={['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
					version: '2.8.0-SNAPSHOT',
					build: '87d0dcd-12e0d6f',
					name,
				}))}
			/>,
		);

		// then
		const lessBtn = screen.getByLabelText('Less');
		expect(lessBtn).toBeInTheDocument();

		expect(screen.getByText('API')).toBeInTheDocument();
		expect(screen.getByText('Dataset')).toBeInTheDocument();
		expect(screen.getByText('Preparation')).toBeInTheDocument();
		expect(screen.getByText('Transformation')).toBeInTheDocument();
	});

	it('should call toggle callback on More button click', () => {
		// given
		const onToggle = jest.fn();
		render(
			<AboutDialog
				show
				version="Summer 18"
				icon="talend-tdp-colored"
				onToggle={onToggle}
				services={['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
					version: '2.8.0-SNAPSHOT',
					build: '87d0dcd-12e0d6f',
					name,
				}))}
			/>,
		);
		expect(onToggle).not.toHaveBeenCalled();

		// when
		const moreBtn = screen.getByLabelText('More');
		fireEvent.click(moreBtn);

		// then
		expect(onToggle).toHaveBeenCalled();
	});

	it('should call toggle callback on Less button click', () => {
		// given
		const onToggle = jest.fn();
		render(
			<AboutDialog
				show
				expanded
				version="Summer 18"
				icon="talend-tdp-colored"
				onToggle={onToggle}
				services={['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
					version: '2.8.0-SNAPSHOT',
					build: '87d0dcd-12e0d6f',
					name,
				}))}
			/>,
		);
		expect(onToggle).not.toHaveBeenCalled();

		// when
		const lessBtn = screen.getByLabelText('Less');
		fireEvent.click(lessBtn);

		// then
		expect(onToggle).toHaveBeenCalled();
	});
});
