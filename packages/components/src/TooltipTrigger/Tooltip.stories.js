import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Button } from '@talend/react-bootstrap';
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
				<Button onClick={action('click')}>{label}</Button>
			</div>
		</TooltipTrigger>
	);
}

storiesOf('Messaging & Communication/Tooltip', module).add('default', () => {
	const style = {
		flex: '0 0 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '49rem',
		height: '30rem',
		textAlign: 'center',
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<div style={{ display: 'flex', flex: 0, flexDirection: 'row', padding: '1rem' }}>
				<div style={{ marginRight: 'auto' }}>
					{generateButtonWithTooltip('↑', 'top')}
					{generateButtonWithTooltip('←', 'left')}
				</div>
				<div style={{ marginLeft: 'auto' }}>
					{generateButtonWithTooltip('→', 'right')}
					{generateButtonWithTooltip('↑', 'top')}
				</div>
			</div>
			<div style={{ display: 'flex', flex: 1, flexDirection: 'row', padding: '1rem' }}>
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
							height: '30rem',
							width: '100rem',
							overflow: 'auto',
							background: '#EEE',
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
			<div style={{ display: 'flex', flex: 0, flexDirection: 'row', padding: '1rem' }}>
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
});
