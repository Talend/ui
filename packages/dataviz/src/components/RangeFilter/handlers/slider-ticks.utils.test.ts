import { formatD3Ticks } from './slider-ticks.utils';

describe('Slider ticks utils', () => {
	it('Should add min/max to d3 generated ticks', () => {
		const ticks = formatD3Ticks(
			{
				min: 2177.87,
				max: 9530.28,
			},
			[4000, 6000, 800],
			v => v.toString(),
		);
		expect(ticks).toEqual({
			'2177.87': '2177.87',
			'4000': '4000',
			'6000': '6000',
			'800': '800',
			'9530.28': '9530.28',
		});
	});
});
