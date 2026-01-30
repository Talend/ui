import { action } from 'storybook/actions';

import { QualityBar } from './QualityBar.component';

export default {
	title: 'Dataviz/SplitQualityBar',
};

export const SplitQualityBar = () => (
	<section style={{ maxWidth: 500, padding: 20 }}>
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
