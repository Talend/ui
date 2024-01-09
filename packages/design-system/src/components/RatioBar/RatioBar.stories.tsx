import { RatioBar as RatioBarComponent } from './RatioBar.component';

export default {
	title: 'Components/Dataviz/RatioBar',
};

export const RatioBar = () => (
	<section style={{ maxWidth: 500, padding: 20 }}>
		<header>Ratio Bar</header>
		<div>
			<div>Not applicable amount</div>
			<RatioBarComponent total={12} />
			<div>With an amount of 0</div>
			<RatioBarComponent amount={0} total={12} />
			<div>With an amount of 10/12</div>
			<RatioBarComponent amount={10} total={12} />
			<div>With an amount of 12/12</div>
			<RatioBarComponent amount={12} total={12} />
			<div>With an amount of 532/1000</div>
			<RatioBarComponent amount={532} total={1000} />
			<div>With an amount of 10/20 with 1 error</div>
			<RatioBarComponent amount={10} errors={1} total={20} />
			<div>With an amount of 532/1000 and no label</div>
			<RatioBarComponent amount={532} total={1000} hideLabel />
		</div>
	</section>
);
