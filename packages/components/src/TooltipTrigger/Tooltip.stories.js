import { action } from '@storybook/addon-actions';

import { ButtonSecondary } from '@talend/design-system';
import tokens from '@talend/design-tokens';

import TooltipTrigger from './TooltipTrigger.component';

function generateButtonWithTooltip(label, tooltipPlacement) {
	// need a wrapper (div) here since Button is a functional component
	return (
		<TooltipTrigger
			label="This is a huuuuuuuuuuuuuuuuuuuuuuge tooltip for a very very demo"
			tooltipPlacement={tooltipPlacement}
			data-feature="my.feature"
		>
			<div style={{ display: 'inline-block' }}>
				<ButtonSecondary onClick={action('click')}>{label}</ButtonSecondary>
			</div>
		</TooltipTrigger>
	);
}

export default {
	title: 'Components/Messaging & Communication/Tooltip',
};

export const Default = () => {
	const style = {
		flex: '0 0 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '30.625rem',
		height: '18.75rem',
		textAlign: 'center',
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<div style={{ display: 'flex', flex: 0, flexDirection: 'row', padding: '0.625rem' }}>
				<div style={{ marginRight: 'auto' }}>
					{generateButtonWithTooltip('↑', 'top')}
					{generateButtonWithTooltip('←', 'left')}
				</div>
				<div style={{ marginLeft: 'auto' }}>
					{generateButtonWithTooltip('→', 'right')}
					{generateButtonWithTooltip('↑', 'top')}
				</div>
			</div>
			<div style={{ display: 'flex', flex: 1, flexDirection: 'row', padding: '0.625rem' }}>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
					{generateButtonWithTooltip('←', 'left')}
				</div>
				<div>
					<h1>TooltipTrigger</h1>
					<h2>Definition</h2>
					<p>
						The action component displays a dropdown where each element let the user dispatch an
						action
					</p>
					<h2>Examples</h2>
					<p>By default :</p>
					<div
						style={{
							display: 'flex',
							margin: '0 auto',
							flexWrap: 'wrap',
							height: '18.75rem',
							width: '62.5rem',
							overflow: 'auto',
							background: tokens.coralColorNeutralBackgroundMedium,
							border: '1px solid',
						}}
					>
						<div style={style}>{generateButtonWithTooltip('→')}</div>
						<div style={style}>{generateButtonWithTooltip('↑', 'top')}</div>
						<div style={style}>{generateButtonWithTooltip('↓', 'bottom')}</div>
						<div style={style}>{generateButtonWithTooltip('←', 'left')}</div>
					</div>

					<p>With a custom component in the tooltip</p>
					<TooltipTrigger
						label={
							<div>
								<span>I'm a custom component</span>
								{'\n'}
								<span>with a line feeding 🙃</span>
							</div>
						}
					>
						<span>Loreum....</span>
					</TooltipTrigger>
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
					{generateButtonWithTooltip('→', 'right')}
				</div>
			</div>
			<div style={{ display: 'flex', flex: 0, flexDirection: 'row', padding: '0.625rem' }}>
				<div style={{ marginRight: 'auto' }}>
					{generateButtonWithTooltip('↓', 'bottom')}
					{generateButtonWithTooltip('←', 'left')}
				</div>
				<div style={{ marginLeft: 'auto' }}>
					{generateButtonWithTooltip('→', 'right')}
					{generateButtonWithTooltip('↓', 'bottom')}
				</div>
			</div>
		</div>
	);
};
