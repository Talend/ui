import RegexpFilter from './RegexpFilter';
import * as TestData from '../TestData';

const elements = [TestData.firstname, TestData.lastname, TestData.birthday, TestData.address];

const dataAccessor = TestData.rowDataGetter;

const filterId = 'regexp-filter';

function checkFilter(filter, selected) {
	for (let i = 0; i < elements.length; i += 1) {
		expect(filter.select(dataAccessor, elements[i])).toBe(selected[i]);
	}
}

it('regexp-filter', () => {
	const filter = new RegexpFilter(filterId, TestData.Columns.NAME.key, false, false);

	checkFilter(filter, [true, true, true, true]);

	filter.setActive(true);
	expect(filter.isActive()).toBe(true);
	checkFilter(filter, [true, true, true, true]);

	filter.setValue('name');
	checkFilter(filter, [true, true, false, false]);

	filter.setValue('last');
	checkFilter(filter, [false, true, false, false]);

	filter.setStrict(true);
	checkFilter(filter, [false, false, false, false]);

	filter.setValue('Last');
	checkFilter(filter, [false, true, false, false]);

	filter.setStrict(false);
	checkFilter(filter, [false, true, false, false]);

	filter.setActive(false);
	expect(filter.isActive()).toBe(false);
	checkFilter(filter, [true, true, true, true]);
});
