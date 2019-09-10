// Takes a titleMap in either object or list format and returns one
// in the list format.
export default function(titleMap: Array<any>, originalEnum?: any) {
	if (!Array.isArray(titleMap)) {
		const canonical = [];
		if (originalEnum) {
			originalEnum.forEach(value => {
				canonical.push({ name: titleMap[value], value });
			});
		} else {
			Object.keys(titleMap).forEach(value => {
				canonical.push({ name: titleMap[value], value });
			});
		}
		return canonical;
	}
	return titleMap;
}
