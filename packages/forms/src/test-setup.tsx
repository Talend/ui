import '@testing-library/jest-dom/vitest';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { it, vi } from 'vitest';

void i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: { en: { translation: {} } },
	interpolation: { escapeValue: false },
});

(globalThis as unknown as { xit: typeof it.skip }).xit = it.skip;

vi.mock('@talend/utils', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('@talend/utils');
	return {
		...actual,
		randomUUID: () => '42',
	};
});

vi.mock('react-virtualized', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('react-virtualized');

	class MockCellMeasurerCache {
		defaultHeight: number;

		constructor(options: { defaultHeight?: number } = {}) {
			this.defaultHeight = options.defaultHeight ?? 33;
		}

		clearAll() {}

		rowHeight = () => this.defaultHeight;
	}

	const MockCellMeasurer = ({
		children,
	}: {
		children: (arg: { measure: () => void }) => unknown;
	}) => children({ measure: () => {} });

	const MockAutoSizer = ({
		children,
	}: {
		children: (arg: { width: number; height: number }) => unknown;
	}) => children({ width: 1024, height: 768 });

	const MockList = React.forwardRef(function MockList(
		{
			rowCount = 0,
			rowRenderer,
			className,
			role,
			containerProps,
		}: {
			rowCount?: number;
			rowRenderer: (arg: {
				index: number;
				key: string;
				style: Record<string, string>;
			}) => React.ReactNode;
			className?: string;
			role?: string;
			containerProps?: Record<string, string>;
		},
		ref: React.ForwardedRef<HTMLDivElement>,
	) {
		const rows = Array.from({ length: rowCount }, (_, index) =>
			rowRenderer({ index, key: String(index), style: {} as Record<string, string> }),
		);
		return (
			<div ref={ref} className={className} role={role} {...containerProps}>
				{rows}
			</div>
		);
	});

	return {
		...actual,
		AutoSizer: MockAutoSizer,
		CellMeasurer: MockCellMeasurer,
		CellMeasurerCache: MockCellMeasurerCache,
		List: MockList,
	};
});
