import { useState } from 'react';
import { AnimationTiming } from 'recharts/types/util/types';
import { ChartEntry } from './barChart.types';

const ANIMATION_DURATION = 80;

interface AnimationProps {
	animationBegin: number;
	animationDuration: number;
	animationEasing: AnimationTiming;
}

export const PRIMARY_BAR_ANIMATION_PROPS: AnimationProps = {
	animationBegin: 0,
	animationDuration: ANIMATION_DURATION,
	animationEasing: 'linear',
};

export const SECONDARY_BAR_ANIMATION_PROPS: AnimationProps = {
	animationBegin: ANIMATION_DURATION,
	animationDuration: ANIMATION_DURATION,
	animationEasing: 'linear',
};

/**
 * Primary bar shows
 * - filtered data if any
 * - unfiltered data otherwise
 */
export function getPrimaryBarValue(entry: ChartEntry<any>): number {
	return entry.filteredValue != null ? entry.filteredValue : entry.value!;
}

/**
 * Secondary bar shows data not matching filter (if any)
 */
export function getSecondaryBarValue(entry: ChartEntry<any>): number | null {
	let value = null;
	if (entry.filteredValue != null && entry.value != null) {
		value = entry.value - entry.filteredValue;
	}
	return value;
}

export function useBarChart<U>(
	data: U[],
	onBarClick: (event: MouseEvent, value: U) => void,
	getTooltipContent: (entry: U) => JSX.Element,
) {
	const [focusedBarIndex, setFocusedBarIndex] = useState<number | null>(null);
	const entry = focusedBarIndex != null ? data[focusedBarIndex] : null;

	return {
		focusedBarIndex,
		onMouseOut: () => setFocusedBarIndex(null),
		onMouseMove: (state: any) => {
			setFocusedBarIndex(state.isTooltipActive ? state.activeTooltipIndex : null);
		},
		onClick: (_: any, event: MouseEvent) => {
			if (entry) {
				onBarClick(event, entry);
			}
		},
		TooltipContent: () => (entry ? getTooltipContent(entry) : null),
	};
}
