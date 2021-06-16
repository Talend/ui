import wrapOnClick from './wrapOnClick';

describe('#wrapOnClick', () => {
	it('should return onclick', () => {
		// given
		const onClick = jest.fn();
		const eventFn = wrapOnClick({
			onClick,
			label: 'label',
			model: {
				id: '#model',
			},
		});

		// when
		eventFn({
			type: 'click',
		});

		// then
		expect(onClick).toHaveBeenCalledWith(
			{
				type: 'click',
			},
			{
				action: { label: 'label' },
				model: { id: '#model' },
			},
		);
	});
});
