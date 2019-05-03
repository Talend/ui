import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import mock from '@talend/react-cmf/lib/mock';

import HttpErrorView from './HttpErrorView.component';

describe('HttpErrorView', () => {
	it('should render 404', () => {
		const state = mock.state();
		state.cmf.components = fromJS({});
		const message = 'did not find it';
		const title = 'Oops';
		const sidepanel = { foo: 'baz' };
		const wrapper = shallow(
			<HttpErrorView
				status={HttpErrorView.STATUS.NOT_FOUND}
				message={message}
				title={title}
				sidepanel={sidepanel}
			/>
		);
		const props = wrapper.props();
		expect(props.one.props.foo).toBe('baz');
		const childProps = props.children.props;
		expect(childProps.status).toBe(HttpErrorView.STATUS.NOT_FOUND);
		expect(childProps.message).toBe(message);
		expect(childProps.title).toBe(title);
	});
	it('should render 403', () => {
		const state = mock.state();
		state.cmf.components = fromJS({});
		const message = 'unauthorized';
		const title = 'Access Denied';
		const sidepanel = { foo: 'baz' };
		const wrapper = shallow(
			<HttpErrorView
				status={HttpErrorView.STATUS.FORBIDDEN}
				message={message}
				title={title}
				sidepanel={sidepanel}
			/>
		);
		const props = wrapper.props();
		expect(props.one.props.foo).toBe('baz');
		const childProps = props.children.props;
		expect(childProps.status).toBe(HttpErrorView.STATUS.FORBIDDEN);
		expect(childProps.message).toBe(message);
		expect(childProps.title).toBe(title);
	});
});
