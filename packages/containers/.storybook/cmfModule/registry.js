export default {
	'_list_sort:sortByLength': sortBy => (a, b) => a.get(sortBy).length - b.get(sortBy).length,
};
