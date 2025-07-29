import { action } from '@storybook/addon-actions';

import { QualityBar } from './QualityBar.component';

export default {
	title: 'Dataviz/QualityBar',
};

export const _QualityBar = () => (
	<section style={{ maxWidth: 500, padding: 20 }}>
		<header>Quality Bar</header>

		<div>
			<div>Homogeneous Quality</div>
			<QualityBar
				invalid={30}
				valid={30}
				empty={30}
				tooltipLabels={{
					empty: '30 empty values',
					invalid: '30 invalid values',
					valid: '30 valid values',
				}}
			/>

			<div>Very invalid</div>
			<QualityBar
				invalid={30}
				valid={0}
				empty={0}
				tooltipLabels={{
					invalid: '30 invalid values',
				}}
			/>

			<div>Not applicable</div>
			<QualityBar
				invalid={30}
				valid={0}
				empty={0}
				na={20}
				tooltipLabels={{
					invalid: '30 invalid values',
					na: '20 not applicable values',
				}}
			/>

			<div>Best quality ever</div>
			<QualityBar
				invalid={0}
				valid={30}
				empty={0}
				tooltipLabels={{
					valid: '30 valid values',
				}}
			/>

			<div>Nothing to see here</div>
			<QualityBar
				invalid={0}
				valid={0}
				empty={30}
				tooltipLabels={{
					empty: '30 empty values',
				}}
			/>

			<div>Invalid and Empty</div>
			<QualityBar
				invalid={0}
				valid={30}
				empty={30}
				tooltipLabels={{
					empty: '30 empty values',
					valid: '30 valid values',
				}}
			/>

			<div>Classic look</div>
			<QualityBar
				invalid={2}
				valid={88}
				empty={3}
				tooltipLabels={{
					empty: '3 empty values',
					invalid: '2 invalid values',
					valid: '88 valid values',
				}}
			/>

			<div>Classic look (again yep)</div>
			<QualityBar
				invalid={122}
				valid={1088}
				empty={293}
				tooltipLabels={{
					empty: '293 empty values',
					invalid: '122 invalid values',
					valid: '1088 valid values',
				}}
			/>

			<div>I really like the digits !</div>
			<QualityBar
				invalid={30}
				valid={30}
				empty={30}
				digits={5}
				tooltipLabels={{
					empty: '30 empty values',
					invalid: '30 invalid values',
					valid: '30 valid values',
				}}
			/>

			<div>With a placeholder</div>
			<QualityBar
				invalid={30}
				valid={0}
				empty={0}
				placeholder={70}
				tooltipLabels={{
					invalid: '30 invalid values',
				}}
			/>

			<div>Disabled</div>
			<QualityBar invalid={30} valid={0} empty={0} placeholder={70} disabled />

			<div>Classic look with action button</div>
			<QualityBar
				invalid={2}
				valid={88}
				empty={3}
				onClick={action('onClickAction')}
				getDataFeature={qualityType => `data-feature.${qualityType}`}
				tooltipLabels={{
					empty: '3 empty values',
					invalid: '2 invalid values',
					valid: '88 valid values',
				}}
			/>
		</div>
	</section>
);
