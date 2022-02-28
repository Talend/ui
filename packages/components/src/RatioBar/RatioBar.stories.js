import React from 'react';

import { RatioBar } from './RatioBar.component';

export default {
	title: 'Data/Dataviz/RatioBar',
};

export const _RatioBar = () => (
	<div>
		<section>
			<header>Ratio Bar</header>
			<div>
				<div>Not applicable amount</div>
				<RatioBar total={12} />
				<div>With an amount of 0</div>
				<RatioBar amount={0} total={12} />
				<div>With an amount of 10/12</div>
				<RatioBar amount={10} total={12} />
				<div>With an amount of 12/12</div>
				<RatioBar amount={12} total={12} />
				<div>With an amount of 532/1000</div>
				<RatioBar amount={532} total={1000} />
				<div>With an amount of 10/20 with 1 error</div>
				<RatioBar amount={10} errors={1} total={20} />
				<div>With an amount of 532/1000 and no label</div>
				<RatioBar amount={532} total={1000} hideLabel />
			</div>
		</section>
	</div>
);
