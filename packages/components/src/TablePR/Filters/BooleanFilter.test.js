import BooleanFilter from './BooleanFilter';
import * as TestData from '../TestData';

const elements = [TestData.firstname, TestData.lastname, TestData.birthday, TestData.address];

const dataAccessor = TestData.rowDataGetter;

const filterId = 'bool-filter';

function checkFilter(filter, selected) {
	for (let i = 0; i < elements.length; i += 1) {
		expect(filter.select(dataAccessor, elements[i])).toBe(selected[i]);
	}
}

it('boolean-filter', () => {
	const filter = new BooleanFilter(filterId, TestData.Columns.MANDATORY.key, false, false);

	checkFilter(filter, [true, true, true, true]);

	filter.setActive(true);
	expect(filter.isActive()).toBe(true);
	checkFilter(filter, [false, true, false, true]);

	filter.setReverse(true);
	checkFilter(filter, [true, false, true, false]);

	filter.setActive(false);
	expect(filter.isActive()).toBe(false);
	checkFilter(filter, [true, true, true, true]);
});
