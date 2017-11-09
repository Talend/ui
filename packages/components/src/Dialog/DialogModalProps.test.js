import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import Dialog from './Dialog.component';

faker.seed(42);
const modalPropsNullDialogProps = {
	header: faker.random.words(),
	bsDialogProps: null,
	show: true,
};
const modalUndefinedDialogProps = {
	header: faker.random.words(),
	bsDialogProps: undefined,
	show: true,
};
const modalNoDialogPropsProps = {
	header: faker.random.words(),
	show: true,
};

const headerProps = {
	header: faker.random.words(),
	show: true,
};

describe('Dialog modal props', () => {
	it('should render dialog without bsDialogProps', () => {
		const customProps = { ...headerProps, undefined };
		expect(customProps.header).toEqual(headerProps.header);
		expect(customProps.show).toEqual(true);

		const wrapperNullDialogProps = shallow(<Dialog {...modalPropsNullDialogProps} />);
		expect(wrapperNullDialogProps.root.node).toMatchSnapshot();

		const wrapperUndefinedDialogProps = shallow(<Dialog {...modalUndefinedDialogProps} />);
		expect(wrapperUndefinedDialogProps.root.node).toMatchSnapshot();

		const wrapperNoDialogPropsProps = shallow(<Dialog {...modalNoDialogPropsProps} />);
		expect(wrapperNoDialogPropsProps.root.node).toMatchSnapshot();
	});
});
