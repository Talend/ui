import getRClick from './utils.js';

describe('getRClick', () => {
	it('should return onclick', () => {
		// given
		const onClick = jest.fn();
		const rClick = getRClick({
			onClick,
			bsStyle: 'bsStyle',
			inProgress: 'inProgress',
			disabled: 'disabled',
			hideLabel: 'hideLabel',
			link: 'link',
			onMouseDown: 'onMouseDown',
			tooltipPlacement: 'tooltipPlacement',
			tooltip: 'tooltip',
			tooltipLabel: 'tooltipLabel',
			available: 'available',
			label: 'label',
			model: {
				id: '#model',
			},
			otherProperty: 'otherProperty',
		});

		// when
		rClick({
			type: 'click',
		});

		// then
		expect(onClick).toHaveBeenCalledWith(
			{
				type: 'click',
			},
			{ action: { label: 'label', otherProperty: 'otherProperty' }, model: { id: '#model' } },
		);
	});
});
