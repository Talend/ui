export default function getTabBarBadgeLabel(label) {
	return !isNaN(label) && label >= 1000 ? '999+' : label;
}
