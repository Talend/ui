export function union(setA, setB) {
	const union = new Set(setA);
	for (const elem of setB) {
		union.add(elem);
	}
	return union;
}

export function isSelectedOrHighlight(dataKey, highlightLegendKey, selectedLegends) {
	if ((!highlightLegendKey && (!selectedLegends || selectedLegends.length === 0)) ||
		highlightLegendKey === dataKey || selectedLegends.find(legend => legend === dataKey)) {
		return true;
	}
	return false;
}

export function getStrokeOpacity(dataKey, highlightLegendKey, selectedLegends) {
	if (isSelectedOrHighlight(dataKey, highlightLegendKey, selectedLegends)) {
		return 1;
	}
	return 0.25;
}

export function getStrokeWidth(dataKey, highlightLegendKey, selectedLegends) {
	if (isSelectedOrHighlight(dataKey, highlightLegendKey, selectedLegends)) {
		return 2;
	}
	return 1.5;
}

export function getDotR(dataKey, highlightLegendKey, selectedLegends) {
	if (isSelectedOrHighlight(dataKey, highlightLegendKey, selectedLegends)) {
		return 3;
	}
	return 0;
}

export function getActiveDotR(dataKey, highlightLegendKey, selectedLegends) {
	if (isSelectedOrHighlight(dataKey, highlightLegendKey, selectedLegends)) {
		return 5;
	}
	return 0;
}
