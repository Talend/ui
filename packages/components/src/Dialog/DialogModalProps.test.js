import React from 'react';
import { shallow } from 'enzyme';
import Dialog from './Dialog.component';

const modalPropsNullDialogProps = {
	header: 'Hello world',
	bsDialogProps: null,
	show: true,
};
const modalUndefinedDialogProps = {
	header: 'Hello world',
	bsDialogProps: undefined,
	show: true,
};
const modalNoDialogPropsProps = {
	header: 'Hello world',
	show: true,
};

const headerProps = {
	header: 'Hello world',
	show: true,
};

describe('Dialog modal props', () => {
	it('should render dialog without bsDialogProps', () => {
		const customProps = { ...headerProps, undefined };
		expect(customProps.header).toEqual('Hello world');
		expect(customProps.show).toEqual(true);

		const wrapperNullDialogProps = shallow(
			<Dialog {...modalPropsNullDialogProps} />
		);
		expect(wrapperNullDialogProps.getElement()).toMatchSnapshot();

		const wrapperUndefinedDialogProps = shallow(
			<Dialog {...modalUndefinedDialogProps} />
		);
		expect(wrapperUndefinedDialogProps.getElement()).toMatchSnapshot();

		const wrapperNoDialogPropsProps = shallow(
			<Dialog {...modalNoDialogPropsProps} />
		);
		expect(wrapperNoDialogPropsProps.getElement()).toMatchSnapshot();
	});
});
