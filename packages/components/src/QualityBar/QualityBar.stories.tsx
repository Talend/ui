import { action } from '@storybook/addon-actions';

import { QualityBar } from './QualityBar.component';

export default {
	title: 'Components/Dataviz/QualityBar',
};

export const Default = () => (
	// @ts-ignore
	<section style={{ 'max-width': 500, padding: 20 }}>
		<header>Quality Bar</header>

		<div>
			<div>Homogeneous Quality</div>
			<QualityBar invalid={30} valid={30} empty={30} />

			<div>Very invalid</div>
			<QualityBar invalid={30} valid={0} empty={0} />

			<div>Not applicable</div>
			<QualityBar invalid={30} valid={0} empty={0} na={20} />

			<div>Best quality ever</div>
			<QualityBar invalid={0} valid={30} empty={0} />

			<div>Nothing to see here</div>
			<QualityBar invalid={0} valid={0} empty={30} />

			<div>Invalid and Empty</div>
			<QualityBar invalid={0} valid={30} empty={30} />

			<div>Classic look</div>
			<QualityBar invalid={2} valid={88} empty={3} />

			<div>Classic look (again yep)</div>
			<QualityBar invalid={122} valid={1088} empty={293} />

			<div>I really like the digits !</div>
			<QualityBar invalid={30} valid={30} empty={30} digits={5} />

			<div>With a placeholder</div>
			<QualityBar invalid={30} valid={0} empty={0} placeholder={70} />

			<div>Disabled</div>
			<QualityBar invalid={30} valid={0} empty={0} placeholder={70} disabled />

			<div>Classic look with action button</div>
			<QualityBar
				invalid={2}
				valid={88}
				empty={3}
				onClick={action('onClickAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
			/>
		</div>
	</section>
);

export const SplitBars = () => (
	// @ts-ignore
	<section style={{ 'max-width': 500, padding: 20 }}>
		<header>Quality Bar</header>

		<div>
			<div>Split quality bar</div>
			<QualityBar
				invalid={10}
				valid={30}
				empty={30}
				onClick={action('onSplitQualityBarAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
				split
			/>
			<QualityBar
				invalid={0}
				valid={100}
				empty={0}
				onClick={action('onSplitQualityBarAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
				split
			/>
			<QualityBar
				invalid={40}
				valid={60}
				empty={0}
				onClick={action('onSplitQualityBarAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
				split
			/>
			<QualityBar
				invalid={40}
				valid={30}
				empty={15}
				na={15}
				onClick={action('onSplitQualityBarAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
				split
			/>

			<div>Disabled</div>
			<QualityBar
				disabled
				invalid={40}
				valid={30}
				empty={15}
				na={15}
				onClick={action('onSplitQualityBarAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
				split
			/>
		</div>
	</section>
);
