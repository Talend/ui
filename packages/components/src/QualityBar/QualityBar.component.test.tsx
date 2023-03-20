import React from 'react';
import { render, screen } from '@testing-library/react';
import { QualityBar, QualityBarProps } from './QualityBar.component';

describe('QualityBar', () => {
	describe('QualityBar component in classic mode', () => {
		it('should render a quality bar', () => {
			// given
			const props: QualityBarProps = {
				valid: 523,
				invalid: 123,
				empty: 332,
			};

			// when
			render(<QualityBar {...props} />);

			// then
			expect(screen.getByTestId('quality-bar-valid')).toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-invalid')).toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-empty')).toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-na')).not.toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-placeholder')).not.toBeInTheDocument();
		});

		it('should render quality bar with just na and placeholder', () => {
			// given
			const props: QualityBarProps = {
				na: 10,
				placeholder: 100,
			};

			// when
			render(<QualityBar {...props} />);

			// then
			expect(screen.queryByTestId('quality-bar-valid')).not.toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-invalid')).not.toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-empty')).not.toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-na')).toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-placeholder')).toBeInTheDocument();
		});

		it('should render a quality bar in a disabled state', () => {
			// given
			const props: QualityBarProps = {
				valid: 523,
				invalid: 123,
				empty: 332,
				disabled: true,
			};

			// when
			render(<QualityBar {...props} />);

			// then
			expect(screen.queryByTestId('quality-bar-valid')).not.toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-invalid')).not.toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-empty')).not.toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-na')).not.toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-placeholder')).toBeInTheDocument();
		});

		it('should render an chart with action button', () => {
			// given
			const mockFunctionAction = jest.fn();
			const props = {
				valid: 523,
				invalid: 123,
				empty: 332,
				na: 100,
				onClick: mockFunctionAction,
				getDataFeature: (qualityType: string) => {
					return `data-feature-${qualityType}`;
				},
			};

			// when
			render(<QualityBar {...props} />);
			screen.getAllByTestId('quality-bar-valid')[0].click();
			// then
			expect(mockFunctionAction).toHaveBeenCalledWith(expect.anything(), { type: 'valid' });
		});
	});

	describe('QualityBar component in split mode', () => {
		it('should render quality bars with numbers', () => {
			// given
			const props: QualityBarProps = {
				valid: 15,
				invalid: 30,
				empty: 55,
				split: true,
			};

			// when
			render(<QualityBar {...props} />);

			// then
			expect(screen.getByText('15%', { collapseWhitespace: true })).toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-valid')).toBeInTheDocument();
			expect(screen.getByText('30%', { collapseWhitespace: true })).toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-invalid')).toBeInTheDocument();
			expect(screen.getByText('55%', { collapseWhitespace: true })).toBeInTheDocument();
			expect(screen.getByTestId('quality-bar-empty')).toBeInTheDocument();
			expect(screen.queryByTestId('quality-bar-na')).not.toBeInTheDocument();
			expect(screen.getAllByTestId('quality-bar-placeholder')).toHaveLength(3);
		});
	});
});
