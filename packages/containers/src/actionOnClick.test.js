import getOnClick from './actionOnClick';

describe('#getOnClick', () => {
	it('should generate onClick', () => {
		const actionOnClick = getOnClick({
			actionCreator: 'menu:link',
		});

		expect(actionOnClick.onClick).toEqual(jasmine.any(Function));
	});

	it('should generate onClick with dispatch', () => {
		const actionOnClick = getOnClick({
			payload: {
				type: 'ACTION',
			},
		});

		expect(actionOnClick.onClick).toEqual(jasmine.any(Function));
	});

	it('should not generate onClick when there is href', () => {
		const onClick = getOnClick({
			href: '//www.talend.com',
		});

		expect(onClick).toEqual({});
	});

	it('should not generate onClick when there isnt href', () => {
		const onClick = getOnClick({
			property: 'test',
		});

		expect(onClick).toEqual({});
	});
});

describe('#getOnClick.onClick', () => {
	it('should trigger an actionCreator', () => {
		const dispatchActionCreator = jest.fn();
		const actionOnClick = getOnClick(
			{
				actionCreator: 'menu:link',
			},
			{ dispatchActionCreator },
		);

		actionOnClick.onClick('event', 'data');

		expect(dispatchActionCreator).toHaveBeenCalledWith('menu:link', 'event', 'data');
	});

	it('should generate onClick with dispatch', () => {
		const dispatch = jest.fn();
		const actionOnClick = getOnClick(
			{
				payload: {
					type: 'ACTION',
				},
			},
			{
				dispatch,
				model: 'model',
			},
		);

		actionOnClick.onClick('event', 'data');

		expect(dispatch).toHaveBeenCalledWith({
			model: 'model',
			type: 'ACTION',
		});
	});
});
