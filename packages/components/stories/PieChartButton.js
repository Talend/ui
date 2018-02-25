import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ActionButton from '../src/Actions/ActionButton';
import PieChartButton from '../src/PieChartButton';

const pieChartData1 = [
	{
		color: '#C3D600',
		percentage: 50,
	},
	{
		color: '#F3C446',
		percentage: 12,
	},
	{
		color: '#66BDFF',
		percentage: 1,
	},
	{
		color: '#E96065',
		percentage: 4,
	},
	{
		color: '#60769E',
		percentage: 3,
	},
];

const pieChartData2 = [
	{
		color: '#C3D600',
		percentage: 60,
	},
	{
		color: '#F3C446',
		percentage: 25,
	},
	{
		color: '#E96065',
		percentage: 12,
	},
];

const onClick = action('You clicked me');
const onMouseDown = action('You mousedown me');
const overlayComponent = <div>I am an overlay</div>;

const stories = storiesOf('PieChartButton', module);
if (!stories.addWithInfo) {
	stories.addWithInfo = stories.add;
}

stories
	.addDecorator(story => <div className="col-lg-offset-2 col-lg-8">{story()}</div>)
	.addWithInfo('default', () => (
		<div>
			<p>Small :</p>
			<PieChartButton display="small" model={pieChartData1} onClick={onClick} />
			<p>Medium :</p>
			<PieChartButton display="medium" model={pieChartData1} onMouseDown={onMouseDown} />
			<p>Large : </p>
			<PieChartButton display="large" model={pieChartData1} />
			<p>with other data :</p>
			<PieChartButton display="medium" model={pieChartData2} />
			<p>with without label :</p>
			<PieChartButton display="medium" model={pieChartData2} hideLabel />
			<p>with overlay component</p>
			<PieChartButton
				display="medium"
				model={pieChartData2}
				overlayComponent={overlayComponent}
				onClick={onClick}
			/>
			<p>with a tooltip</p>
			<PieChartButton
				display="medium"
				model={pieChartData2}
				label="this is a tooltip"
				tooltip
				tooltipPlacement="right"
				onClick={onClick}
			/>
		</div>
	))
	.addWithInfo('Loading state', () => {
		class WithLayout extends React.Component {
			constructor() {
				super();
				this.changeInProgress = this.changeInProgress.bind(this);
				this.state = { inProgress: true };
			}

			changeInProgress() {
				this.setState(prevState => ({
					inProgress: !prevState.inProgress,
				}));
			}

			render() {
				return (
					<div>
						<ActionButton label="changestatus" onClick={this.changeInProgress} />
						<p>Small :</p>
						<PieChartButton
							display="small"
							model={pieChartData1}
							inProgress={this.state.inProgress}
						/>
						<p>Medium :</p>
						<PieChartButton
							display="medium"
							model={pieChartData1}
							inProgress={this.state.inProgress}
						/>
						<p>Large :</p>
						<PieChartButton
							display="large"
							model={pieChartData1}
							inProgress={this.state.inProgress}
						/>
						<p>after large</p>
					</div>
				);
			}
		}
		return <WithLayout />;
	});
